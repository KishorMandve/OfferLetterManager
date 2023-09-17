import {render, screen} from '@testing-library/react';
import Home from '@/app/page';


describe('Home', () => {
    it("should have docs", () => {
        render(<Home/>);
        const myElem = screen.getByText('Docs');
        expect(myElem).toBeInTheDocument();
    });
});
