import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { BasicInput } from './basic-input.component';

describe('number input', () => {
    const setupInput = async () => {
        const { getByLabelText } = render(
            <Formik initialValues={{ number: 0 }} onSubmit={null}>
                <Form>
                    <BasicInput
                      type="number"
                      label="Number"
                      showLabel={true}
                      name="number"
                      placeholder="Enter number"
                    />
                </Form>
            </Formik>,
        );
        return getByLabelText('Number') as HTMLInputElement;
    };

    it('exists', async () => {
        const input = await setupInput();
        expect(input.type).toEqual('number');
    });

    it('can input data', async () => {
        const input = await setupInput();
        const expected = 1;

        fireEvent.change(input, { target: { valueAsNumber: expected } });
        fireEvent.blur(input);

        await wait();

        expect(input.valueAsNumber).toEqual(expected);
    });
});

describe('text input', () => {
    const setupInput = async () => {
        const { getByLabelText } = render(
            <Formik initialValues={{ text: '' }} onSubmit={null}>
                <Form>
                    <BasicInput
                      type="text"
                      label="Text"
                      showLabel={true}
                      name="text"
                      placeholder="Enter text"
                    />
                </Form>
            </Formik>,
        );
        return getByLabelText('Text') as HTMLInputElement;
    };

    it('exists', async () => {
        const input = await setupInput();
        expect(input.type).toEqual('text');
    });

    it('can input data', async () => {
        const input = await setupInput();
        const expected = 'Some text';

        fireEvent.change(input, { target: { value: expected } });
        fireEvent.blur(input);

        await wait();

        expect(input.value).toEqual(expected);
    });
});

describe('telephone number input', () => {
    const setupInput = async () => {
        const { getByLabelText } = render(
            <Formik initialValues={{ telephoneNumber: '' }} onSubmit={null}>
                <Form>
                    <BasicInput
                        type="tel"
                        label="Telephone Number"
                        name="telephoneNumber"
                        showLabel={true}
                        placeholder="Enter telephone number"
                    />
                </Form>
            </Formik>,
        );
        return getByLabelText('Telephone Number') as HTMLInputElement;
    };

    it('exists', async () => {
        const input = await setupInput();
        expect(input.type).toEqual('tel');
    });

    it('can input data', async () => {
        const input = await setupInput();
        const expected = '0800001066';

        fireEvent.change(input, { target: { value: expected } });
        fireEvent.blur(input);

        await wait();

        expect(input.value).toEqual(expected);
    });
});

describe('date input', () => {
    const setupInput = async () => {
        const { getByLabelText } = render(
            <Formik initialValues={{ date: '' }} onSubmit={null}>
                <Form>
                    <BasicInput
                      type="date"
                      label="date"
                      showLabel={false}
                      name="date"
                    />
                </Form>
            </Formik>,
        );
        return getByLabelText('date') as HTMLInputElement;
    };

    it('exists', async () => {
        const input = await setupInput();
        expect(input.type).toEqual('date');
    });

    it('can input data', async () => {
        const input = await setupInput();
        const expected = '1990-09-10';

        fireEvent.change(input, { target: { value: expected } });
        fireEvent.blur(input);

        await wait();

        expect(input.value).toEqual(expected);
    });
});

describe('checkbox input', () => {
    const setupInput = async () => {
        const { getByLabelText } = render(
            <Formik initialValues={{ checkbox: false }} onSubmit={null}>
                <Form>
                    <BasicInput
                      type="checkbox"
                      label="checkbox"
                      showLabel={true}
                      name="checkbox"
                    />
                </Form>
            </Formik>,
        );
        return getByLabelText('checkbox') as HTMLInputElement;
    };

    it('exists', async () => {
        const input = await setupInput();
        expect(input.type).toEqual('checkbox');
    });

    it('can input data', async () => {
        const input = await setupInput();
        const expected = true;

        fireEvent.click(input);
        fireEvent.blur(input);

        await wait();

        expect(input.checked).toEqual(expected);
    });
});