const ops = ["+", "-", "*", "/"];
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [lastpressed, setLastPressed] = React.useState(undefined);
  const [calc, setCalc] = React.useState("0");
  const [overWrite, setOverWrite] = React.useState(false);

  const display = (e) => {
    const { innerText } = e.target;

    switch (innerText) {
      case ".": {
        const point = calc.split(/[\+\-\*\/]/).slice(-1)[0];
        if (!point.includes(".")) {
          setCalc(calc + ".");
        }
        break;
      }
       default: {
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastpressed) && innerText !== "-") {
            const lastIndex = calc
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && nums.includes(+char));
            e = calc.slice(0, calc.length - lastIndex) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }

          if (calc.length === 7 && innerText === "-") {
            if (ops.includes(lastpressed)) {
              e = calc.slice(0, -5) + ` ${innerText} `;
            }
            return;
          }
        } else {
          e = calc === "0" ? innerText : calc + innerText;
        }

        if (calc !== undefined) {
          if (/[*/+-]/.test(innerText)) setCalc((prev) => prev + innerText);
        }
        setCalc(e);
      }
    }
    if (overWrite) {
      if (/[^*/+-]/.test(innerText)) setCalc(innerText);
      setOverWrite(false);
    }
    setLastPressed(innerText);
  };

  const clearAll = () => {
    setCalc("0");
  };

  const evaluate = () => {
    try {
      setCalc(eval(calc));
      setOverWrite(true);
    } catch {
      setCalc("Error Input!");
    }
  };

  const del = () => {
    setCalc(calc.slice(0, -1));
  };

  return (
    <div className="calculator">
      <div className="output">
        <div id="display" className="display">
          {calc}
        </div>
      </div>
      <button id="clear" onClick={clearAll} className="btn ac">
        AC
      </button>
      <button className="btn delete" onClick={del}>
        Del
      </button>
      <button id="multiply" onClick={display} className="btn operation">
        *
      </button>
      <button id="divide" onClick={display} className="btn operation">
        /
      </button>
      <button id="seven" onClick={display} className="btn number">
        7
      </button>
      <button id="eight" onClick={display} className="btn number">
        8
      </button>
      <button id="nine" onClick={display} className="btn number">
        9
      </button>
      <button id="subtract" onClick={display} className="btn operation">
        -
      </button>
      <button id="four" onClick={display} className="btn number">
        4
      </button>
      <button id="five" onClick={display} className="btn number">
        5
      </button>
      <button id="six" onClick={display} className="btn number">
        6
      </button>
      <button id="add" onClick={display} className="btn operation">
        +
      </button>
      <button id="one" onClick={display} className="btn number">
        1
      </button>
      <button id="two" onClick={display} className="btn number">
        2
      </button>
      <button id="three" onClick={display} className="btn number">
        3
      </button>
      <button id="equals" onClick={evaluate} className="btn span-equal">
        =
      </button>
      <button id="zero" onClick={display} className="btn number span-two">
        0
      </button>
      <button id="decimal" onClick={display} className="btn number">
        .
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
