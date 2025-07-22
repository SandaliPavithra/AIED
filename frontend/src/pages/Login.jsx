import React, { useState } from "react";
import { 
  Button, 
  Input, 
  FormField, 
  SpaceBetween,
  Alert,
  Container,
  Box
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: "",
      general: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

 const handleLogin = async () => {
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = Array.isArray(data.detail)
        ? data.detail[0].msg
        : data.detail;
      setErrors(prev => ({
        ...prev,
        general: message || "Login failed"
      }));
      return;
    }

    // ✅ Login successful
    navigate("/student");
  } catch (error) {
    setErrors(prev => ({
      ...prev,
      general: "Network error. Please try again later."
    }));
  } finally {
    setIsLoading(false);
  }
};

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1837c4ff 0%, #10bfffff 100%)",
      padding: "40px"
    }}>
      <Box padding="xxl" margin="l">
        <Container>
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "60px 80px",
            boxShadow: "0 25px 45px rgba(0,0,0,0.15)",
            minWidth: "520px",
            maxWidth: "640px"
          }}>
            <SpaceBetween size="xl">
              {/* Header section */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "2.8rem",
                  color: "#1b2a3dff",
                  marginBottom: "20px",
                  fontWeight: "bold"
                }}>
                  Sign In
                </div>
                <div style={{
                  color: "#666",
                  fontSize: "1rem",
                  marginTop: "30px"
                }}>
                  Welcome Back! Please enter your credentials to continue.
                </div>
              </div>

              {/* Error alert */}
              {errors.general && (
                <Alert type="error">
                  {errors.general}
                </Alert>
              )}

              {/* Form fields */}
              <SpaceBetween size="l">
                <FormField
                  label="Email"
                  errorText={errors.email}
                  description="Enter your registered email address"
                >
                  <Input
                    value={formData.email}
                    onChange={({ detail }) => handleInputChange("email", detail.value)}
                    placeholder="Enter your email"
                    type="email"
                    invalid={!!errors.email}
                  />
                </FormField>

                <FormField
                  label="Password"
                  errorText={errors.password}
                  description="Enter your account password"
                >
                  <Input
                    value={formData.password}
                    onChange={({ detail }) => handleInputChange("password", detail.value)}
                    placeholder="Enter your password"
                    type="password"
                    invalid={!!errors.password}
                  />
                </FormField>
              </SpaceBetween>

              {/* Sign in button */}
              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="primary"
                  onClick={handleLogin}
                  loading={isLoading}
                  disabled={!formData.email.trim() || !formData.password.trim()}
                  fullWidth
                  size="large"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>

              {/* Sign up link */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                marginTop: "20px",
                fontSize: "1rem",
                color: "#555"
              }}>
                <span>Don't have an account?</span>
                <Button
                  onClick={handleSignUp}
                  disabled={isLoading}
                  size="small"
                  variant="link"
                >
                  Create Account
                </Button>
              </div>
            </SpaceBetween>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default Login;