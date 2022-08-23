import { importTemplateIntoApplication } from "actions/templateActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isFetchingTemplatesSelector } from "selectors/templatesSelectors";
import styled from "styled-components";
import { TemplatesContent } from "..";
import Filters from "../Filters";
import LoadingScreen from "./LoadingScreen";
import { Template } from "api/TemplatesApi";
import TemplateModalHeader from "./Header";

const Wrapper = styled.div`
  display: flex;
  height: 85vh;
  overflow: auto;
`;

const FilterWrapper = styled.div`
  .filter-wrapper {
    width: 200px;
  }
`;

const ListWrapper = styled.div`
  height: 80vh;
  overflow: auto;
`;

type TemplateListProps = {
  onTemplateClick: (id: string) => void;
  onClose: () => void;
};

function TemplateList(props: TemplateListProps) {
  const dispatch = useDispatch();
  const onForkTemplateClick = (template: Template) => {
    dispatch(importTemplateIntoApplication(template.id, template.title));
  };
  const isFetchingTemplates = useSelector(isFetchingTemplatesSelector);

  if (isFetchingTemplates) {
    return <LoadingScreen text="Loading templates list" />;
  }

  return (
    <Wrapper className="flex flex-col">
      <TemplateModalHeader hideBackButton onClose={props.onClose} />
      <div className="flex">
        <FilterWrapper>
          <Filters />
        </FilterWrapper>
        <ListWrapper>
          <TemplatesContent
            onForkTemplateClick={onForkTemplateClick}
            onTemplateClick={props.onTemplateClick}
            stickySearchBar
          />
        </ListWrapper>
      </div>
    </Wrapper>
  );
}

export default TemplateList;
