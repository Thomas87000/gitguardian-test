import { useDispatch, useSelector } from 'react-redux'
import { BiChevronsLeft, BiChevronsRight, BiChevronLeft, BiChevronRight, BiPlay, BiPause } from "react-icons/bi";
import React from 'react'
import { Box, Button, Icon, Flex } from '@chakra-ui/react'



import { LiveTable } from './LiveTable'
import { LiveChart } from './LiveChart'
import { Container } from './Container'

const ButtonNavigation = ({ icon, disabled = false, ...restProps }) => {
	return (
		<Box 
			as="button" 
			cursor={disabled ? "not-allowed" : "pointer"} 
			disabled={disabled} 
			opacity={disabled ? "0.4" : "1"}
			{...restProps}>
			<Icon verticalAlign="middle" as={icon} w="25px" h="25px" />
		</Box>
	)
}

const Exercise = () => {
	const { lastItemIndexDisplayed } = useSelector((state) => state);
	const dispatch = useDispatch()
	return (
		<Box p={8} w="1400px" >
			<Flex alignItems="center" justifyContent="flex-end">
				<ButtonNavigation 
					icon={BiChevronsLeft}
					disabled={lastItemIndexDisplayed === 20}
					onClick={() => dispatch({ type: 'go_to_first' })} />
				<ButtonNavigation 
					icon={BiChevronLeft} 
					disabled={lastItemIndexDisplayed === 20} 
					onClick={() => dispatch({ type: 'previous' })} />
				{!lastItemIndexDisplayed ? (
					<ButtonNavigation 
						icon={BiPause} 
						onClick={() => dispatch({ type: 'pause' })} />
				) : (
					<ButtonNavigation 
						icon={BiPlay} 
						onClick={() => dispatch({ type: 'play' })} />
				)}
				<ButtonNavigation 
					icon={BiChevronRight} 
					disabled={!lastItemIndexDisplayed} 
					onClick={() => dispatch({ type: 'next' })} />
				<ButtonNavigation 
					icon={BiChevronsRight} 
					disabled={!lastItemIndexDisplayed} 
					onClick={() => dispatch({ type: 'go_to_last' })} />
				<Button ml="20px" onClick={() => dispatch({ type: 'reset_edited_values' })}>Reset edited values</Button>
			</Flex>
			<LiveChart
				mb={8}
				onChartClick={(selectedEvent) =>
				dispatch({
					type: 'select_event',
					selectedEvent,
				})
				}
			/>
			<LiveTable ml={8} mt={8} />
		</Box>
	)
}

export const ExerciseLiveChart = () => {
  return (
    <Container>
      <Exercise />
    </Container>
  )
}
