import { useState } from "react";
import { conditions, conditionsBool } from "../../costants";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [passwordCondition, setPasswordCondition] = useState(conditionsBool);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPWD = e.target.value;
    setPassword(newPWD);

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

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("Password Copied With Success ✅");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
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
            <button onClick={handleShowPassword}>👁️</button>
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
                {passwordCondition[condition.id] ? "     ✅" : "       ❌"}
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button>They Found It ?</button>
          <button>Will they crack it</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordChecker;
