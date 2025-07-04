import { useState } from "react";
import { conditions, conditionsBool } from "../../costants";
import CryptoJS from "crypto-js";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [passwordCondition, setPasswordCondition] = useState(conditionsBool);
  const [showPassword, setShowPassword] = useState(false);
  const [pawned, setPawned] = useState(null); 

  const handlePasswordChange = (e) => {
    const newPWD = e.target.value;
    setPassword(newPWD);

    setPawned(null); 

    setPasswordCondition({
      hasLowerCase: /[a-z]/.test(newPWD),
      hasUpperCase: /[A-Z]/.test(newPWD),
      hasNumber: /[0-9]/.test(newPWD),
      hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(
        newPWD
      ),
      isMinLenght: newPWD.length >= 8, 
    });
  };

  const handleCopyPassword = async () => {
    try {
      if (password) {
        await navigator.clipboard.writeText(password);
        alert("Password Copied With Success ✅");
      } else {
        alert("No password to copy!");
      }
    } catch (err) {
      console.error("Failed to copy password:", err);
      alert("Failed to copy password. Please try manually.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePawnedPassword = async () => {
    if (!password) {
      alert("Please enter a password to check for breaches.");
      return; // Stop execution if no password
    }

    try {
      const pwdHash = CryptoJS.SHA1(password)
        .toString(CryptoJS.enc.Hex)
        .toUpperCase();
      const prefix = pwdHash.substring(0, 5);
      const suffix = pwdHash.substring(5);

      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment before trying again."
          );
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();

      const hashes = text.split("\r\n").map((line) => {
        const [hashSuffix, count] = line.split(":");
        return { hashSuffix, count: parseInt(count, 10) };
      });

      const found = hashes.find((h) => h.hashSuffix === suffix);

      if (found) {
        setPawned(true);
        alert(
          `This password has been found ${found.count} times in data breaches!`
        );
      } else {
        setPawned(false);
        alert(
          "Good news! This password has NOT been found in known data breaches."
        );
      }
    } catch (error) {
      console.error("Error checking pwned password:", error);
      alert(
        `Error checking password: ${error.message || "Please try again later."}`
      );
      setPawned(null); 
    }
  };

  return (
    <div className="password-checker">
      <div className="password-checker-container">
        <div>
          <h3>Password Checker</h3>
          <div className="input-zone">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Check Your Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={handleCopyPassword}>Copy</button>
            <button onClick={handleShowPassword}>
              {showPassword ? "🙈" : "👁️"} 
            </button>
          </div>
          <div className="line"></div>
        </div>
        <div className="condition">
          <ul>
            {conditions.map((condition) => (
              <li
                key={condition.id}
                className={
                  passwordCondition[condition.id] ? "line-through" : ""
                }
              >
                {condition.text}
                {passwordCondition[condition.id] ? " ✅" : " ❌"}
              </li>
            ))}
          </ul>
          {pawned !== null && ( 
            <p className={`hibp-status ${pawned ? "pwned" : "not-pwned"}`}>
              {pawned
                ? "🚨 This password has been found in data breaches!"
                : "✅ This password has NOT been found in known breaches."}
            </p>
          )}
        </div>
        <div className="buttons">
          <button onClick={handlePawnedPassword}>Check for Breaches</button>{" "}
          <button>Will they crack it</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordChecker;
