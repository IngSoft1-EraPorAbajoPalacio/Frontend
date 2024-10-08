import FormCreateRoom from "../components/views/Public/Home/FormularioCrearPartida";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockedSets = vi.fn(); 
const mockMaxLonNombres = 20;

test('render formulario de creacion', () => {
    render(<FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />);
    const existe = screen.getByText(/Nombre de partida:/i); // Veo que se muestre la frase/titulo del form de creacion
    expect(existe).toBeVisible();
});

test('interactuar con input de nombre de partida', () => {
    render(<FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />);
    const nombrePartida =  screen.getByPlaceholderText("SalaDeTorval") as HTMLInputElement;
    fireEvent.change(nombrePartida, {target: {value: "EraPorAbajoPalacio"}});
    expect(nombrePartida.value).toBe("EraPorAbajoPalacio");
});

test('interactuar con input de alias jugador', () => {
    render(<FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />);
    const alias =  screen.getByPlaceholderText("Player1") as HTMLInputElement;
    fireEvent.change(alias, {target: {value: "Torval"}});
    expect(alias.value).toBe("Torval");
});

test('limite de cantidad de letras alias jugador', () => {
    render(<FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />);
    const alias =  screen.getByPlaceholderText("Player1") as HTMLInputElement;
    fireEvent.change(alias, {target: {value: "abdulajrabinachbinbar"}}); //21 caracteres
    expect(alias.value.length).not.toBeGreaterThan(mockMaxLonNombres);
});

test('limite de cantidad de letras nombre partida', () => {
    render(<FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />);
    const nombrePartida =  screen.getByPlaceholderText("SalaDeTorval") as HTMLInputElement;
    fireEvent.change(nombrePartida, {target: {value: "abdulajrabinachbinbar"}}); //21 caracteres
    expect(nombrePartida.value.length).not.toBeGreaterThan(mockMaxLonNombres);
});

