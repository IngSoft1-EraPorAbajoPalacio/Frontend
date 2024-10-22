import { describe, it, expect } from "vitest";
import VerificarMovimiento from "../components/views/Public/Game/VerificarMovimiento";
import { fichasMock, movimientosMock } from "../data/MockPartidaEnCurso";
import { CartaMovimiento, movimiento } from "../types/partidaEnCurso";

describe("VerificarMovimiento", () => {

    it("mov1 (dos pasos en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {


        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[0].id, movimientosMock[0].movimiento as movimiento),
            primerFicha: fichasMock[2],
            segundaFicha: fichasMock[12]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[0].id, movimientosMock[0].movimiento as movimiento),
            primerFicha: fichasMock[2],
            segundaFicha: fichasMock[12]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov2 (dos pasos horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[1].id, movimientosMock[1].movimiento as movimiento),
            primerFicha: fichasMock[18],
            segundaFicha: fichasMock[20]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[1].id, movimientosMock[1].movimiento as movimiento),
            primerFicha: fichasMock[20],
            segundaFicha: fichasMock[18]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov3 (un paso horizontalmente o verticalmente): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[2].id, movimientosMock[2].movimiento as movimiento),
            primerFicha: fichasMock[21],
            segundaFicha: fichasMock[22]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[2].id, movimientosMock[2].movimiento as movimiento),
            primerFicha: fichasMock[22],
            segundaFicha: fichasMock[21]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov4 (un paso en diagonal): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[3].id, movimientosMock[3].movimiento as movimiento),
            primerFicha: fichasMock[9],
            segundaFicha: fichasMock[16]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[3].id, movimientosMock[3].movimiento as movimiento),
            primerFicha: fichasMock[16],
            segundaFicha: fichasMock[9]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov5 (en forma de L inversa): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[4].id, movimientosMock[4].movimiento as movimiento),
            primerFicha: fichasMock[27],
            segundaFicha: fichasMock[35]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[4].id, movimientosMock[4].movimiento as movimiento),
            primerFicha: fichasMock[35],
            segundaFicha: fichasMock[27]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov6 (en forma de L): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[5].id, movimientosMock[5].movimiento as movimiento),
            primerFicha: fichasMock[27],
            segundaFicha: fichasMock[23]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[5].id, movimientosMock[5].movimiento as movimiento),
            primerFicha: fichasMock[27],
            segundaFicha: fichasMock[31]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov7 (Mover hasta un borde manteniendo la misma fila o columna): Debería ser válido jugar una carta de movimiento correctamente estando en turno", async () => {

        const movimiento = {
        carta: new CartaMovimiento(movimientosMock[6].id, movimientosMock[6].movimiento as movimiento),
        primerFicha: fichasMock[23],
        segundaFicha: fichasMock[35]
        };

        const movimientoReversa = {
            carta: new CartaMovimiento(movimientosMock[6].id, movimientosMock[6].movimiento as movimiento),
            primerFicha: fichasMock[14],
            segundaFicha: fichasMock[17]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(true);
        expect(VerificarMovimiento(movimientoReversa, 5, 5)).toBe(true);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento estando fuera de turno", async () => {

        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[0].id, movimientosMock[0].movimiento as movimiento),
            primerFicha: fichasMock[2],
            segundaFicha: fichasMock[12]
        };

        expect(VerificarMovimiento(movimiento, 5, 6)).toBe(false);
    });

    it("mov1 (dos pasos en diagonal): No debería ser válido jugar una carta de movimiento, estando en turno, con un movimiento no válido", async () => {
            
        const movimiento = {
            carta: new CartaMovimiento(movimientosMock[0].id, movimientosMock[0].movimiento as movimiento),
            primerFicha: fichasMock[2],
            segundaFicha: fichasMock[13]
        };

        expect(VerificarMovimiento(movimiento, 5, 5)).toBe(false);
    }); 
});