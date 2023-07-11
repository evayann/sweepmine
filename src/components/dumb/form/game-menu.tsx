import { Signal, component$, useSignal, $, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { SubmitHandler, formAction$, toCustom$, useForm, zodForm$ } from '@modular-forms/qwik';
import { z } from '@builder.io/qwik-city';
import { Dimension, useDimensions } from '~/hooks/useDimsension';

import styles from './styles.css?inline';

const dimensionErrorMessage = "Can't have less than 3 block";
const gameMenuSchema = z.object({
    dimension: z.object({
        x: z.number().min(3, dimensionErrorMessage).max(100),
        y: z.number().min(3, dimensionErrorMessage).max(100),
    }),
    nbBombs: z.number().min(3).max(30),
});

type GameProperties = z.infer<typeof gameMenuSchema>;

// export const useFormAction = formAction$<GameProperties>((formValues) => {
//     const { setDimension } = useDimensions();
//     console.log(formValues.dimension);

//     useVisibleTask$(() => {
//         console.log(formValues.dimension);
//         setDimension(formValues.dimension);
//     });
// }, zodForm$(gameMenuSchema));

export interface GameMenuProps {
    dimension: Dimension;
}

export default component$((gameMenuProps: GameMenuProps) => {
    useStyles$(styles);

    const { dimension, setDimension } = useDimensions();

    const gameMenuLoader: Signal<GameProperties> = useSignal(() => ({
        dimension: dimension.value,
        nbBombs: 3,
    }));
    const [gameMenuForm, { Form, Field, FieldArray }] = useForm<GameProperties>({
        loader: gameMenuLoader,
        validate: zodForm$(gameMenuSchema),
    });

    const handleSubmit: SubmitHandler<GameProperties> = $((gameProperties: GameProperties, event: any) => {
        console.log(gameProperties);
        setDimension(gameProperties.dimension);
    });

    return (
        <Form onSubmit$={handleSubmit}>
            <p>
                Width x Height :
                <span>
                    <Field name="dimension.x" type="number">
                        {(field, props) => (
                            <>
                                <input
                                    {...props}
                                    type="number"
                                    min={gameMenuSchema.shape.dimension.shape.x.minValue as number}
                                    max={gameMenuSchema.shape.dimension.shape.x.maxValue as number}
                                    value={field.value}
                                />
                                {field.error && <p> {field.error} </p>}
                            </>
                        )}
                    </Field>
                    x
                    <Field name="dimension.y" type="number">
                        {(field, props) => (
                            <>
                                <input
                                    {...props}
                                    type="number"
                                    min={gameMenuSchema.shape.dimension.shape.y.minValue as number}
                                    max={gameMenuSchema.shape.dimension.shape.y.maxValue as number}
                                    value={field.value}
                                />
                                {field.error && <p> {field.error} </p>}
                            </>
                        )}
                    </Field>
                </span>
            </p>
            <p>
                Number of bombs :
                <Field name="nbBombs" type="number">
                    {(field, props) => (
                        <>
                            <input
                                {...props}
                                type="number"
                                min={gameMenuSchema.shape.nbBombs.minValue as number}
                                max={gameMenuSchema.shape.nbBombs.maxValue as number}
                                value={field.value}
                            />
                            {field.error && <p> {field.error} </p>}
                        </>
                    )}
                </Field>
            </p>
            <button type="submit">Update game</button>
        </Form>
    );
});
