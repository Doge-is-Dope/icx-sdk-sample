import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Link,
} from "@material-ui/core";
import "fontsource-roboto";
import logo from "./icx/icon.svg";
import {
  getDefaultStepCost,
  getMaxStepLimit,
  getStepPrice,
} from "./icx/sdk_utils";
import "./App.css";

const App = () => {
  const [stepCost, setStepCost] = useState();
  const [maxStepLimit, setMaxStepLimit] = useState();
  const [stepPrice, setStepPrice] = useState();

  useEffect(() => {
    getDefaultStepCost().then((stepCost) => {
      console.log("App -> stepCost", stepCost);
      setStepCost(stepCost);
    });
    getMaxStepLimit().then((maxStepLimit) => {
      console.log("App -> maxStepLimit", maxStepLimit);
      setMaxStepLimit(maxStepLimit);
    });
    getStepPrice().then((stepPrice) => {
      console.log("App -> stepPrice", stepPrice);
      setStepPrice(stepPrice);
    });
  }, []);

  return (
    <div>
      <span className="App-header">
        <img className="App-logo" src={logo} alt="ic_icon" />
        <Typography variant="h2">ICON Transaction Fee</Typography>
      </span>
      <span className="App-sub-header">
        <Typography variant="h6">
          Transaction fee = <code>usedStep</code> * <code>stepPrice</code>
        </Typography>
      </span>
      <Divider />

      <List>
        <ListItem>
          <Typography variant="h4" className="list-title">
            Instruction
          </Typography>
        </ListItem>
        <ListItem>
          - <code>step</code>: The unit of measurement for transaction fees on
          the ICON network.
        </ListItem>
        <ListItem>
          - <code>usedStep</code>: This is the actual amount of step consumed by
          the transaction. <code>usedStep</code> is the sum of
          <code>stepCost</code> for each action processed in the transaction.
        </ListItem>
        <ListItem>
          - <code>stepPrice</code>: The price of a step. This can be fluctuating
          when the ICX price goes too high or too low.
        </ListItem>
        <ListItem>
          - <code>stepLimit</code>: This is determined by the sender to limit
          the maximum steps that can be used.
        </ListItem>
        <ListItem>
          - <code>maxStepLimit</code>: This is the maximum limit that can be
          used for a single transaction. For now, it’s 2,500,000,000 steps.
        </ListItem>
        <ListItem>
          - The amount of <code>step</code> required is measured by the
          computational resources required to execute the transaction.
        </ListItem>
        <ListItem>
          - If <code>usedStep</code> reaches the <code>stepLimit</code> before
          finishing the execution, the transaction will fail with out of step
          error, but the amount of
          <code>stepLimit</code> is deducted from your balance.
        </ListItem>
        <ListItem>
          - Before executing your transaction, your account must hold at least
          <code>stepLimit</code> * <code>stepPrice</code> amount of ICX. If you
          do not have sufficient ICX, your transaction will fail immediately.
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem>
          <Typography variant="h4" className="list-title">
            Query Result
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`stepCost(default): ${parseInt(stepCost, 16)} steps 
            = ${parseInt(stepCost, 16) / 10 ** 8} ICX`}
            secondary="1 ICX = 10^8 Step"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`maxStepLimit: ${maxStepLimit} steps 
            = ${maxStepLimit / 10 ** 8} ICX`}
            secondary="1 ICX = 10^8 Step"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`stepPrice: ${stepPrice} loops 
            = ${stepPrice / 10 ** 9} Gloop
            = ${stepPrice / 10 ** 18} ICX`}
            secondary="1 ICX = 10^9 Gloop, 1 Gloop = 10^9 loop"
          />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem>
          <Typography variant="h4" className="list-title">
            Reference
          </Typography>
        </ListItem>
        <ListItem>
          <Link
            href="https://icon-project.github.io/docs/step.html"
            target="_blank"
            rel="noopener"
          >
            ICON GitHub documentation - Transaction Fee
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.icondev.io/docs/transaction-fees#transaction-fee-policy"
            target="_blank"
            rel="noopener"
          >
            ICON DEVPORTAL - Transaction Fee Policy
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://github.com/icon-project/governance/blob/master/README.md#methods-list"
            target="_blank"
            rel="noopener"
          >
            Governance SCORE APIs - Methods
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://tracker.icon.foundation/"
            target="_blank"
            rel="noopener"
          >
            ICON Tracker
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.rapidtables.com/convert/number/hex-to-decimal.html"
            target="_blank"
            rel="noopener"
          >
            Hexadecimal to Decimal converter
          </Link>
        </ListItem>
      </List>
    </div>
  );
};
export default App;
