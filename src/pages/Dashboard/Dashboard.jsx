import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaQrcode,
  FaBatteryThreeQuarters,
  FaBars,
  FaSignOutAlt,
  FaGasPump,
} from "react-icons/fa";
import styles from "./Dashboard.module.css";
import { authService } from "../../services/authService";
import BottomNav from "../../components/global/BottomNav";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        try {
          const userData = await authService.getUserDetails();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/signup");
  };

  const navigateToShareTank = () => {
    navigate("/sharetank");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.headerBG}></div>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Kia ora {user?.firstName || "Guest"},</h1>
          <div className={styles.sharetankInfo}>
            <FaGasPump style={{ fontSize: "1.3em" }} />
            <span style={{ fontSize: "1.3em" }}> Sharetank</span>
            <p>
              Maximize Your Fuel,
              <br />
              Amplify Your Sharing
            </p>
          </div>
          <button className={styles.viewTankBtn} onClick={navigateToShareTank}>
            View my tank
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        <div
          onClick={() => navigate("/fuel-comparison")}
          className={styles.card}
        >
          <span className={styles.cardContent}>
            Fuel Price
            <br />
            Comparison
          </span>
        </div>
        <div className={styles.card} onClick={() => navigate("/pay-by-plate")}>
          <span className={styles.cardContent}>Pay by Plate</span>
        </div>
        <div className={styles.card} onClick={() => navigate("/orderfood")}>
          <span className={styles.cardContent}>Order Food</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardContent}>Z Near me</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
