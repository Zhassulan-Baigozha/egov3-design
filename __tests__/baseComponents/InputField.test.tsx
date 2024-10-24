import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { InputField } from "~baseComponents";

describe("InputField", () => {
  it("(1) Should render without crashing", () => {
    const { getByPlaceholderText } = render(
      <InputField
        id={"testRenderId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
      />
    );
    expect(getByPlaceholderText("")).toBeInTheDocument();
  });

  it("(2) Should render with the correct placeholder", () => {
    const placeholder = "Enter text";
    const { getByPlaceholderText } = render(
      <InputField
        id={"testPlaceholderId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
        placeholder={placeholder}
      />
    );
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("(3) Should call onFocus and onBlur handlers", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <InputField
        id={"testOnBlurId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
        placeholder="test"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const input = getByPlaceholderText("test");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("(4) Should render inputLeftIcon if provided", () => {
    const leftIcon = <span data-testid="left-icon">Icon</span>;
    const { getByTestId } = render(
      <InputField
        id={"testLeftId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
        inputLeftIcon={leftIcon}
      />
    );
    expect(getByTestId("left-icon")).toBeInTheDocument();
  });

  it.skip("(5) Should render and clears value when clear icon is clicked", () => {
    const onChange = jest.fn();
    const value = "test value";
    const { getByPlaceholderText, getByTestId } = render(
      <InputField
        id={"testId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
        placeholder="test"
        value={value}
        onChange={onChange}
        isClearable
      />
    );
    const input = getByPlaceholderText("test");
    expect(input).toHaveValue(value);
    const clearIcon = getByTestId("Icons_CLEAR");
    fireEvent.click(clearIcon);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "" } })
    );
  });

  it("(6) Should apply focused class on focus", () => {
    const { getByPlaceholderText, container } = render(
      <InputField
        id={"testFocusedId"}
        labelText={""}
        ariaLabel={"test ariaLabel"}
        placeholder="test"
      />
    );
    const input = getByPlaceholderText("test");
    fireEvent.focus(input);
    expect(container.firstChild).toHaveClass("input--onfocus");
  });
});
