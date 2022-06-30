import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Player from '.'

test('o botão play deve ficar com o simbolode pause ou clicar e vice versa',()=>{
render(<Player/>)
const play = screen.getByRole('button')
fireEvent.click(play);
expect(play).toHaveValue('||')
})