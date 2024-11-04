import FormularioUnirsePartida from "../components/views/Public/Home/FormularioUnirsePartida";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockedSets = vi.fn();
const mockMaxLonNombres = 20;
const mockIdPartida = 0;

const MockJoinRoom = () => {
    return <FormularioUnirsePartida idPartida={mockIdPartida} setIdJugador={mockedSets} />;
};

test('render formulario de unirse', () => {
    render(<MockJoinRoom/>);
    const existe = screen.getByText(/Unirse a Sala/i); // Veo que se muestre la frase/titulo del form de creacion
    expect(existe).toBeVisible();
});

test('interactuar con input de alias jugador', () => {
    render(<MockJoinRoom/>);
    const alias = screen.getByPlaceholderText("Ingrege su nombre") as HTMLInputElement;
    fireEvent.change(alias, { target: { value: "Torval" } });
    expect(alias.value).toBe("Torval");
});

test('limite de cantidad de letras alias jugador', () => {
    render(<MockJoinRoom/>);
    const alias = screen.getByPlaceholderText("Ingrege su nombre") as HTMLInputElement;
    fireEvent.change(alias, { target: { value: "abdulajrabinachbinbar" } }); //21 caracteres
    expect(alias.value.length).not.toBeGreaterThan(mockMaxLonNombres);
});

test('no submit sin alias', () => {
    render(<MockJoinRoom/>);
    const alias = screen.getByPlaceholderText("Ingrege su nombre");
    expect(alias).toBeRequired();
});