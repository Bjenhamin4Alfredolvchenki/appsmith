import * as React from "react";

import BaseControl, { ControlProps } from "./BaseControl";
import TooltipComponent from "components/ads/Tooltip";
import { getSelectedAppThemeProperties } from "selectors/appThemingSelectors";
import store from "store";
import {
  boxShadowOptions,
  boxShadowPropertyName,
  getThemePropertyBinding,
} from "constants/ThemeContants";
import { startCase } from "lodash";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
export interface BoxShadowOptionsControlProps extends ControlProps {
  propertyValue: string | undefined;
}

interface BoxShadowOptionsControlState {
  themeBoxShadowOptions: Record<string, string>;
}

class BoxShadowOptionsControl extends BaseControl<
  BoxShadowOptionsControlProps,
  BoxShadowOptionsControlState
> {
  constructor(props: BoxShadowOptionsControlProps) {
    super(props);
    this.state = {
      themeBoxShadowOptions: {},
    };
  }

  static getControlType() {
    return "BOX_SHADOW_OPTIONS";
  }

  componentDidMount() {
    const theme = getSelectedAppThemeProperties(store.getState());

    if (Object.keys(theme[boxShadowPropertyName]).length) {
      this.setState({
        themeBoxShadowOptions: theme[boxShadowPropertyName],
      });
    }
  }

  renderOptions = (optionKey: string, optionValue: string) => {
    return (
      <TooltipComponent
        content={
          <div>
            <div>{startCase(optionKey)}</div>
          </div>
        }
        key={optionKey}
      >
        <button
          className={`flex items-center justify-center w-8 h-8 bg-white border ring-gray-700 ${
            this.props.propertyValue === optionValue ? "ring-1" : ""
          }`}
          onClick={() => {
            this.updateProperty(this.props.propertyName, optionValue);
          }}
        >
          <div
            className="flex items-center justify-center w-5 h-5 bg-white"
            style={{ boxShadow: optionValue }}
          >
            {optionValue === "none" && (
              <CloseLineIcon className="text-gray-700" />
            )}
          </div>
        </button>
      </TooltipComponent>
    );
  };

  public render() {
    return (
      <div className="mt-1">
        <div className="inline-flex">
          <div className="grid grid-cols-5 gap-2 auto-cols-max">
            {Object.keys(boxShadowOptions).map((optionKey) =>
              this.renderOptions(
                optionKey,
                boxShadowOptions[optionKey],
                boxShadowOptions[optionKey],
              ),
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BoxShadowOptionsControl;
