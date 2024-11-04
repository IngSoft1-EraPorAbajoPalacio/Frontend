import FormCreateRoom from "../components/views/Public/Home/FormularioCrearPartida";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Home from "../components/layouts/Home";
import { BrowserRouter } from "react-router-dom";


const mockedSets = vi.fn();
const mockMaxLonNombres = 20;

const MockCreateRoomForm = () => {
    return <FormCreateRoom setIdPartida={mockedSets} setIdJugador={mockedSets} />;
};


describe('Unitest', () => {

    test('render formulario de creacion', () => {
        render(<MockCreateRoomForm />);
        const existe = screen.getByText(/Nombre de partida/i); // Veo que se muestre la frase/titulo del form de creacion
        expect(existe).toBeVisible();
    });

    test('interactuar con input de nombre de partida', () => {
        render(<MockCreateRoomForm />);
        const nombrePartida = screen.getByPlaceholderText("Sala de Torval") as HTMLInputElement;
        fireEvent.change(nombrePartida, { target: { value: "EraPorAbajoPalacio" } });
        expect(nombrePartida.value).toBe("EraPorAbajoPalacio");
    });

    test('interactuar con input de alias jugador', () => {
        render(<MockCreateRoomForm />);
        const alias = screen.getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
        fireEvent.change(alias, { target: { value: "Torval" } });
        expect(alias.value).toBe("Torval");
    });

    test('limite de cantidad de letras alias jugador', () => {
        render(<MockCreateRoomForm />);
        const alias = screen.getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
        fireEvent.change(alias, { target: { value: "abdulajrabinachbinbar" } }); //21 caracteres
        expect(alias.value.length).not.toBeGreaterThan(mockMaxLonNombres);
    });

    test('limite de cantidad de letras nombre partida', () => {
        render(<MockCreateRoomForm />);
        const nombrePartida = screen.getByPlaceholderText("Sala de Torval") as HTMLInputElement;
        fireEvent.change(nombrePartida, { target: { value: "abdulajrabinachbinbar" } }); //21 caracteres
        expect(nombrePartida.value.length).not.toBeGreaterThan(mockMaxLonNombres);
    });

    test('no submit sin nombre de Partida, ni alias', () => {
        render(<MockCreateRoomForm />);
        const nombrePartida = screen.getByPlaceholderText("Sala de Torval");
        const alias = screen.getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
        expect(alias).toBeRequired();
        expect(nombrePartida).toBeRequired();
    });

});


describe('Integration Test', () => {

    const MockHome = () => {
        return <BrowserRouter><Home /></BrowserRouter>;
    };

    test('click abrir form de crear partida', () => {
        render(<MockHome />);
        const botonAbrirFormC = screen.getByText(/Crear partida/i);
        fireEvent.click(botonAbrirFormC);
        const existe = screen.getByText(/Nombre de partida/i);
        expect(existe).toBeVisible();
    })


});