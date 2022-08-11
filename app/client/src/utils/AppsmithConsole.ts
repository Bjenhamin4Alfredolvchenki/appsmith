import {
  addErrorLogInit,
  debuggerLogInit,
  deleteErrorLogInit,
} from "actions/debuggerActions";
import { ReduxAction } from "@appsmith/constants/ReduxActionConstants";
import { Severity, LogActionPayload, Log } from "entities/AppsmithConsole";
import moment from "moment";
import store from "store";

function dispatchAction(action: ReduxAction<unknown>) {
  store.dispatch(action);
}

function log(ev: Log) {
  dispatchAction(debuggerLogInit(ev));
}

function getTimeStamp() {
  return moment().format("hh:mm:ss");
}

function addLog(
  ev: LogActionPayload,
  severity = Severity.INFO,
  timestamp = getTimeStamp(),
) {
  log({
    ...ev,
    severity,
    timestamp,
  });
}

function info(ev: LogActionPayload, timestamp?: string) {
  log({
    ...ev,
    severity: Severity.INFO,
    timestamp: !!timestamp ? timestamp : getTimeStamp(),
  });
}

function warning(ev: LogActionPayload, timestamp?: string) {
  log({
    ...ev,
    severity: Severity.WARNING,
    timestamp: !!timestamp ? timestamp : getTimeStamp(),
  });
}

// This is used to show a log as an error
// NOTE: These logs won't appear in the errors tab
// To add errors to the errors tab use the addError method.
function error(ev: LogActionPayload, timestamp?: string) {
  log({
    ...ev,
    severity: Severity.ERROR,
    timestamp: !!timestamp ? timestamp : getTimeStamp(),
  });
}

// This is used to add an error to the errors tab
function addError(payload: LogActionPayload, severity = Severity.ERROR) {
  dispatchAction(
    addErrorLogInit({
      ...payload,
      severity: severity,
      timestamp: getTimeStamp(),
    }),
  );
}

// This is used to remove an error from the errors tab
function deleteError(id: string, analytics?: Log["analytics"]) {
  dispatchAction(deleteErrorLogInit(id, analytics));
}

export default {
  addLog,
  info,
  warning,
  error,
  addError,
  deleteError,
};
