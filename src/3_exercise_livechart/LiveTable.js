import { useSelector, useDispatch } from 'react-redux'
import React, { forwardRef, useRef } from 'react'
import { 
	Box, 
	Popover, 
	Portal, 
	PopoverContent, 
	PopoverArrow, 
	PopoverTrigger,
	PopoverHeader,
	PopoverCloseButton,
	PopoverBody,
	Button,
	Input,
	Flex
} from '@chakra-ui/react'

const FormEditEvent = forwardRef(({ event }, ref) => {
	const dispatch = useDispatch();
	
	// Submit form to edit value
	const onSubmitForm = (e) => {
		e.preventDefault();
		const value = e?.target?.value_1?.value;
		if (value !== "") {
			dispatch({
				type: 'edit_event_value',
				value: parseInt(value),
				index: event?.index
			});
		}
	}

	return (
		<form onSubmit={onSubmitForm}>
			<Flex gap={2}>
				<Input ref={ref} type="number" defaultValue={event?.value1 ?? 0} name="value_1" flex={1} />
				<Button type='submit' colorScheme='green'>Save</Button>
			</Flex>
		</form>
	)
});

FormEditEvent.displayName = "FormEditEvent";

const EditableCellPopover = ({ event, index }) => {
	const inputRef = useRef();
	const selectedEvent = useSelector((state) => state?.selectedEvent);
	const dispatch = useDispatch();

	return (
		<Popover
			isOpen={Boolean(selectedEvent === index)}
			onOpen={() => {
				dispatch({
					type: 'select_event',
					selectedEvent: index,
				});
			}}
			onClose={() => {
				dispatch({
					type: 'select_event',
					selectedEvent: null
				});
			}}
			closeOnBlur={true}
			isLazy
			initialFocusRef={inputRef}
		>
			<PopoverTrigger>
				<Cell as="button">{event?.value1 ?? 0}</Cell>
			</PopoverTrigger>
			<Portal>
				<PopoverContent>
					<PopoverArrow />
					<PopoverHeader>Edit event {event?.index}</PopoverHeader>
					<PopoverCloseButton />
					<PopoverBody>
						<FormEditEvent event={event} ref={inputRef} />
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>	
	)
}

const Cell = forwardRef((props, ref) => {
	return (
		<Box
			border="1px"
			d="inline-block"
			w="50px"
			h="22px"
			px={1}
			mb="-1px"
			mr="-1px"
			ref={ref}
			{...props}
		/>
	)
});

Cell.displayName = "Cell";

export const LiveTable = (props) => {
	const data = useSelector((state) => {
		const lastItemIndexToDisplay = state?.lastItemIndexDisplayed ?? state?.events?.length;
		return state.events.slice(lastItemIndexToDisplay - 20, lastItemIndexToDisplay);
	});

	return (
		<Box {...props}>
			<Box h="24px" overflow="hidden">
				<Cell w="80px">Index</Cell>
				{data.map((event) => {
				return <Cell key={event.index}>{event.index}</Cell>
				})}
			</Box>
			<Box h="24px" overflow="hidden">
				<Cell w="80px">Value 1</Cell>
				{data.map((event, index) => {
					return (
						<EditableCellPopover key={event.index} index={index} event={event} />
					);
				})}
			</Box>
			<Box h="24px" overflow="hidden">
				<Cell w="80px">Value 2</Cell>
				{data.map((event) => {
				return <Cell key={event.index}>{event.value2}</Cell>
				})}
			</Box>
		</Box>
	)
}
