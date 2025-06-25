import { useState } from "react";
import { conditions } from "../../costants";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  return (
    <div className="password-checker">
      <div className="password-checker-container">
        <div>
          <h3>Password Checker</h3>
          <input
            type="text"
            placeholder="Check Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="line"></div>
        </div>
        <div className="condition">
          <ul>
            {conditions.map((condition, i) => (
              <li key={i}>{condition}</li>
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
