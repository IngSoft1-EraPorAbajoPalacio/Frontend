import { describe, it, expect, vi } from "vitest";
import VerificarMovimiento from "../components/views/Public/Game/VerificarMovimiento";
import { partidaMock } from "../data/MockPartidaEnCurso";

describe("VerificarMovimiento", () => {

    it("mov1 (dos pasos en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[0],
        primerFicha: partidaMock.fichas[2],
        segundaFicha: partidaMock.fichas[12]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[0],
            primerFicha: partidaMock.fichas[2],
            segundaFicha: partidaMock.fichas[12]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov2 (dos pasos horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[1],
        primerFicha: partidaMock.fichas[18],
        segundaFicha: partidaMock.fichas[20]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[1],
            primerFicha: partidaMock.fichas[20],
            segundaFicha: partidaMock.fichas[18]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov3 (un paso horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[2],
        primerFicha: partidaMock.fichas[21],
        segundaFicha: partidaMock.fichas[22]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[2],
            primerFicha: partidaMock.fichas[22],
            segundaFicha: partidaMock.fichas[21]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov4 (un paso en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[3],
        primerFicha: partidaMock.fichas[9],
        segundaFicha: partidaMock.fichas[16]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[3],
            primerFicha: partidaMock.fichas[16],
            segundaFicha: partidaMock.fichas[9]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov5 (en forma de L inversa): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[4],
        primerFicha: partidaMock.fichas[27],
        segundaFicha: partidaMock.fichas[23]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[4],
            primerFicha: partidaMock.fichas[27],
            segundaFicha: partidaMock.fichas[31]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov6 (en forma de L): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[5],
        primerFicha: partidaMock.fichas[27],
        segundaFicha: partidaMock.fichas[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[5],
            primerFicha: partidaMock.fichas[35],
            segundaFicha: partidaMock.fichas[27]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

    it("mov7 (Mover hasta un borde manteniendo la misma fila o columna): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: partidaMock.jugadores[0].cartasMovimiento[6],
        primerFicha: partidaMock.fichas[23],
        segundaFicha: partidaMock.fichas[35]
        };

        const movimientoReversa = {
            carta: partidaMock.jugadores[0].cartasMovimiento[6],
            primerFicha: partidaMock.fichas[14],
            segundaFicha: partidaMock.fichas[17]
        };

        expect(VerificarMovimiento(movimiento, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, partidaMock.jugadores[0].id, partidaMock.jugadores[0].id)).toBe(true);
    });

});