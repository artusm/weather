import {describe, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import {Modal} from "./Modal";
import userEvent from "@testing-library/user-event";

describe("<Modal />", () => {
    test("should render model correctly", () => {
        render(<Modal onClick={() => void 0}>Inner</Modal>);
        const mainElement = screen.getByText(/Inner/i);
        expect(mainElement).toBeInTheDocument();
    });
    test("should call onClose when CloseButton is clicked", async () => {
        const spy = vi.fn();

        render(
            <Modal onClick={spy}>
                test
            </Modal>
        );
        await userEvent.click(screen.getByRole('button'));

        expect(spy).toBeCalledTimes(1)
    });
})