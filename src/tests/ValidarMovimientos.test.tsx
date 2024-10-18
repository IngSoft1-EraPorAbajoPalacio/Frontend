import { describe, it, expect } from "vitest";
import VerificarMovimiento from "../components/views/Public/Game/VerificarMovimiento";
import { fichas, partidaMock } from "../data/MockPartidaEnCurso";

describe("VerificarMovimiento", () => {

    it("mov1 (dos pasos en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {


        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichas[2],
        segundaFicha: fichas[12]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[0],
            primerFicha: fichas[2],
            segundaFicha: fichas[12]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov2 (dos pasos horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[1],
        primerFicha: fichas[18],
        segundaFicha: fichas[20]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[1],
            primerFicha: fichas[20],
            segundaFicha: fichas[18]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov3 (un paso horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[2],
        primerFicha: fichas[21],
        segundaFicha: fichas[22]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[2],
            primerFicha: fichas[22],
            segundaFicha: fichas[21]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov4 (un paso en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[3],
        primerFicha: fichas[9],
        segundaFicha: fichas[16]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[3],
            primerFicha: fichas[16],
            segundaFicha: fichas[9]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov5 (en forma de L inversa): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[4],
        primerFicha: fichas[27],
        segundaFicha: fichas[23]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[4],
            primerFicha: fichas[27],
            segundaFicha: fichas[31]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov6 (en forma de L): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[5],
        primerFicha: fichas[27],
        segundaFicha: fichas[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[5],
            primerFicha: fichas[35],
            segundaFicha: fichas[27]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov7 (Mover hasta un borde manteniendo la misma fila o columna): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[6],
        primerFicha: fichas[23],
        segundaFicha: fichas[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[6],
            primerFicha: fichas[14],
            segundaFicha: fichas[17]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento estando fuera de turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichas[2],
        segundaFicha: fichas[12]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[1].id)).toBe(false);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento, estando en turno, con un movimiento no válido", async () => {
            
        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: fichas[2],
        segundaFicha: fichas[13]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(false);
    }); 
});