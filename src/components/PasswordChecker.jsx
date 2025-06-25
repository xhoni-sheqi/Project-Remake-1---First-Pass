import { conditions } from "../../costants";

function PasswordChecker() {
  return (
    <div className="password-checker-container">
      <h3>Password Checker</h3>
      <input type="text" placeholder="Check Your Password" />
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
  );
}

export default PasswordChecker;
