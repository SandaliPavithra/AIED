import React, { useState } from "react";
import {
  Button,
  Input,
  FormField,
  SpaceBetween,
  Alert,
  Container,
  Box,
  Flashbar,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [flashItems, setFlashItems] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
        general: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        let errorMessage = "An unexpected error occurred.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // response not JSON or empty, fallback error
        }
        throw new Error(errorMessage);
      }

      setFlashItems([
        {
          type: "success",
          header: "Account Created!",
          content: "Your account was created successfully. Please sign in.",
          dismissible: true,
          onDismiss: () => setFlashItems([]),
          id: "signup-success-message",
        },
      ]);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  const isFormValid = () =>
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.confirmPassword.trim();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #11ddccff 0%, #2d0d96ff 100%)",
        padding: "20px",
      }}
    >
      <div style={{ position: "absolute", top: "20px", width: "90%", maxWidth: "800px" }}>
        <Flashbar items={flashItems} />
      </div>
      <Box padding="xxl" margin="xl">
        <Container>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "60px 80px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              minWidth: "500px",
              maxWidth: "600px",
            }}
          >
            <SpaceBetween size="xxl">
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    color: "#1b2a3dff",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Create Account
                </div>
                <div style={{ color: "#666", fontSize: "1rem", marginTop: "30px" }}>
                  Welcome! Please fill in the details below to create your account.
                </div>
              </div>

              {errors.general && (
                <Alert type="error" header="Account Creation Failed">
                  {errors.general}
                </Alert>
              )}

              <SpaceBetween size="xl">
                <FormField
                  label={
                    <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#232F3E" }}>
                      Full Name
                    </span>
                  }
                  errorText={errors.fullName}
                  description="Enter your first and last name"
                >
                  <Input
                    value={formData.fullName}
                    onChange={({ detail }) => handleInputChange("fullName", detail.value)}
                    placeholder="Enter your full name"
                    invalid={!!errors.fullName}
                  />
                </FormField>

                <FormField
                  label={
                    <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#232F3E" }}>
                      Email Address
                    </span>
                  }
                  errorText={errors.email}
                  description="This email will be used for account verification and notifications"
                >
                  <Input
                    value={formData.email}
                    onChange={({ detail }) => handleInputChange("email", detail.value)}
                    placeholder="Enter your email address"
                    type="email"
                    invalid={!!errors.email}
                  />
                </FormField>

                <FormField
                  label={
                    <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#232F3E" }}>
                      Password
                    </span>
                  }
                  errorText={errors.password}
                  description="Must be 8+ characters with uppercase, lowercase, and a number"
                >
                  <Input
                    value={formData.password}
                    onChange={({ detail }) => handleInputChange("password", detail.value)}
                    placeholder="Create a strong password"
                    type="password"
                    invalid={!!errors.password}
                  />
                </FormField>

                <FormField
                  label={
                    <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#232F3E" }}>
                      Confirm Password
                    </span>
                  }
                  errorText={errors.confirmPassword}
                  description="Re-enter your password to confirm"
                >
                  <Input
                    value={formData.confirmPassword}
                    onChange={({ detail }) => handleInputChange("confirmPassword", detail.value)}
                    placeholder="Confirm your password"
                    type="password"
                    invalid={!!errors.confirmPassword}
                  />
                </FormField>
              </SpaceBetween>

              <SpaceBetween size="l">
                <div style={{ marginTop: "20px" }}>
                  <Button
                    variant="primary"
                    onClick={handleSignUp}
                    loading={isLoading}
                    disabled={!isFormValid() || isLoading}
                    fullWidth
                    size="large"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>

                                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "20px",
                    fontSize: "1rem",
                    color: "#666",
                  }}
                >
                  <span>Already have an account?</span>
                  <Button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    variant="link"
                    size="small"
                  >
                    Sign in
                  </Button>
                </div>
              </SpaceBetween>
            </SpaceBetween>
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default SignUp;
