import { combineReducers } from "redux";
import entityReducer from "./entityReducers";
import uiReducer from "./uiReducers";
import { reducer as formReducer } from "redux-form";
import { CanvasWidgetsReduxState } from "./entityReducers/canvasWidgetsReducer";
import { EditorReduxState } from "./uiReducers/editorReducer";
import { ErrorReduxState } from "./uiReducers/errorReducer";
import { APIDataState } from "./entityReducers/apiDataReducer";
import { QueryDataState } from "./entityReducers/queryDataReducer";
import { ActionDataState } from "./entityReducers/actionsReducer";
import { PropertyPaneConfigState } from "./entityReducers/propertyPaneConfigReducer";
import { PropertyPaneReduxState } from "./uiReducers/propertyPaneReducer";
import { WidgetConfigReducerState } from "./entityReducers/widgetConfigReducer";
import { WidgetSidebarReduxState } from "./uiReducers/widgetSidebarReducer";
import { ResourceDataState } from "./entityReducers/resourcesReducer";
import { AppViewReduxState } from "./uiReducers/appViewReducer";
import { BindingsDataState } from "./entityReducers/bindingsReducer";

const appReducer = combineReducers({
  entities: entityReducer,
  ui: uiReducer,
  form: formReducer,
});

export default appReducer;

export interface AppState {
  ui: {
    widgetSidebar: WidgetSidebarReduxState;
    editor: EditorReduxState;
    propertyPane: PropertyPaneReduxState;
    errors: ErrorReduxState;
    view: AppViewReduxState;
  };
  entities: {
    canvasWidgets: CanvasWidgetsReduxState;
    apiData: APIDataState;
    queryData: QueryDataState;
    actions: ActionDataState;
    propertyConfig: PropertyPaneConfigState;
    widgetConfig: WidgetConfigReducerState;
    resources: ResourceDataState;
    nameBindings: BindingsDataState;
  };
}
