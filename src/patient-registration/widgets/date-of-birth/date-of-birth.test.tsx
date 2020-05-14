import React from "react";
import { shallow, mount } from "enzyme";
import DateOfBirth from "./date-of-birth.component";

const mockProps = {
  setDate: jest.fn(),
};

describe("date of birth", () => {
  const wrapper = shallow(<DateOfBirth setDate={mockProps.setDate} />);

  it("renders a container", () => {
    expect(wrapper.find(".DateOfBirthContainer")).toHaveLength(1);
  });

  it("renders a date picker input", () => {
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find(".DateOfBirthDatePicker")).toHaveLength(1);
    expect(wrapper.find('[type="date"]')).toHaveLength(1);
  });

  it("renders an date picker input label", () => {
    expect(wrapper.find("label")).toHaveLength(1);
    expect(wrapper.find("label").text()).toEqual("Date of Birth:");
  });
});

describe("date of birth interaction", () => {
  const wrapper = mount(<DateOfBirth setDate={mockProps.setDate} />);

  it("has a default state and value", () => {
    expect(wrapper.state("date")).toEqual("dd/mm/yyyy");
    expect(wrapper.find("input").prop("value")).toEqual("dd/mm/yyyy");
  });

  it("changes the date of birth", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "12/10/1994" } });
    expect(wrapper.state("date")).toEqual("12/10/1994");
    expect(wrapper.find("input").prop("value")).toEqual("12/10/1994");
  });
});
