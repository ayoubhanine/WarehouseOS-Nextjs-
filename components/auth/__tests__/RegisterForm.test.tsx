import { render, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

// Mock de useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock du service register
jest.mock("@/services/auth.service", () => ({
  register: jest.fn(),
}));

describe("RegisterForm", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<RegisterForm />);

    expect(
      screen.getByPlaceholderText("Nom complet")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Adresse email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Mot de passe")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Confirmer le mot de passe")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /s'inscrire/i,
      })
    ).toBeInTheDocument();
  });
});