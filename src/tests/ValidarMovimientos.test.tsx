import { describe, it, expect } from "vitest";
import VerificarMovimiento from "../components/views/Public/Game/VerificarMovimiento";
import { fichasMock, partidaMock } from "../data/MockPartidaEnCurso";

describe("VerificarMovimiento", () => {

    it("mov1 (dos pasos en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {


        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichasMock[2],
        segundaFicha: fichasMock[12]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[0],
            primerFicha: fichasMock[2],
            segundaFicha: fichasMock[12]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov2 (dos pasos horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[1],
        primerFicha: fichasMock[18],
        segundaFicha: fichasMock[20]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[1],
            primerFicha: fichasMock[20],
            segundaFicha: fichasMock[18]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov3 (un paso horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[2],
        primerFicha: fichasMock[21],
        segundaFicha: fichasMock[22]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[2],
            primerFicha: fichasMock[22],
            segundaFicha: fichasMock[21]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov4 (un paso en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[3],
        primerFicha: fichasMock[9],
        segundaFicha: fichasMock[16]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[3],
            primerFicha: fichasMock[16],
            segundaFicha: fichasMock[9]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov5 (en forma de L inversa): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[4],
        primerFicha: fichasMock[27],
        segundaFicha: fichasMock[23]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[4],
            primerFicha: fichasMock[27],
            segundaFicha: fichasMock[31]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov6 (en forma de L): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[5],
        primerFicha: fichasMock[27],
        segundaFicha: fichasMock[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[5],
            primerFicha: fichasMock[35],
            segundaFicha: fichasMock[27]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov7 (Mover hasta un borde manteniendo la misma fila o columna): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[6],
        primerFicha: fichasMock[23],
        segundaFicha: fichasMock[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[6],
            primerFicha: fichasMock[14],
            segundaFicha: fichasMock[17]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento estando fuera de turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichasMock[2],
        segundaFicha: fichasMock[12]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[1].id)).toBe(false);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento, estando en turno, con un movimiento no válido", async () => {
            
        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichasMock[2],
        segundaFicha: fichasMock[13]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(false);
    }); 
});