import React from "react";
import {
  ALIGN_ITEMS,
  BaseCellComponentProps,
  JUSTIFY_CONTENT,
} from "../Constants";
import { CellWrapper } from "../TableStyledWrappers";
import CheckboxComponent from "widgets/CheckboxWidget/component/index";
import { LabelPosition } from "components/constants";
import { ColumnAction } from "components/propertyControls/ColumnActionSelectorControl";
import styled from "styled-components";

const CheckboxCellWrapper = styled(CellWrapper)`
  & > div {
    justify-content: ${(props) =>
      props.horizontalAlignment &&
      JUSTIFY_CONTENT[props.horizontalAlignment]} !important;

    align-items: ${(props) =>
      props.verticalAlignment &&
      ALIGN_ITEMS[props.verticalAlignment]} !important;
  }
`;

type CheckboxCellProps = BaseCellComponentProps & {
  columnAction: ColumnAction;
  value: boolean;
  accentColor: string;
  isDisabled?: boolean;
  onCommandClick: (dynamicTrigger: string, onComplete?: () => void) => void;
  borderRadius: string;
};

export const CheckboxCell = (props: CheckboxCellProps) => {
  const {
    accentColor,
    allowCellWrapping,
    borderRadius,
    cellBackground,
    columnAction,
    compactMode,
    fontStyle,
    horizontalAlignment,
    isCellVisible,
    isDisabled,
    isHidden,
    onCommandClick,
    textColor,
    textSize,
    value,
    verticalAlignment,
  } = props;

  const handleChange = () => {
    onCommandClick(columnAction.dynamicTrigger);
  };

  return (
    <CheckboxCellWrapper
      allowCellWrapping={allowCellWrapping}
      cellBackground={cellBackground}
      compactMode={compactMode}
      fontStyle={fontStyle}
      horizontalAlignment={horizontalAlignment}
      isCellVisible={isCellVisible}
      isHidden={isHidden}
      textColor={textColor}
      textSize={textSize}
      verticalAlignment={verticalAlignment}
    >
      <CheckboxComponent
        accentColor={accentColor}
        borderRadius={borderRadius}
        isChecked={value}
        isDisabled={isDisabled}
        isLoading={false}
        isRequired={false}
        key={columnAction.id}
        label=""
        labelPosition={LabelPosition.Auto}
        onCheckChange={handleChange}
        rowSpace={5}
        widgetId={""}
      />
    </CheckboxCellWrapper>
  );
};
