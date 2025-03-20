import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("renders the header with the correct text", () => {
    render(<Header />);
  
    const headerText = screen.getAllByText((_, element) => 
      element?.textContent === "An Official Website of the Singapore Government"
    ).find(Boolean); 
  
    expect(headerText).toBeInTheDocument();
  });
  

  it("renders the Singapore government logo", () => {
    render(<Header />);

    const imgElement = screen.getByAltText("lion icon");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "singapore-icon.svg");
  });
});
