import {fireEvent, render} from '@testing-library/react'
import React from 'react'
import {describe, expect, it} from 'vitest'
import {JsonViewer} from "../src";

describe('render <Object/> with multiple instances', () => {
    it('render', () => {
        const {container, rerender} = render(
            <JsonViewer
                rootName={false}
                value={['string1', 'string2']}
                defaultInspectDepth={0}
            />
        )

        let elements = container.getElementsByClassName('data-object-body');
        expect(elements.length).eq(1)
        expect(elements[0].textContent).eq('...')
        fireEvent.click(elements[0])

        rerender(
            <JsonViewer
                rootName={false}
                value={['string1', 'string2']}
                defaultInspectDepth={0}
            />
        )
        elements = container.getElementsByClassName('data-object-body');
        expect(elements.length).eq(0)

        elements = container.getElementsByClassName('data-object');
        expect(elements.length).eq(1)
        expect(elements[0].children.length).eq(2)
    })
})
