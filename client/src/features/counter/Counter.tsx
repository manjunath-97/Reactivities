import { observer } from "mobx-react-lite";
import useStore from "../../lib/hooks/useStore";
import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from "@mui/material";


const Counter = observer(() => {
	const { counterStore } = useStore();

	return (
		<Box sx={{display:"flex",flexDirection:"row" }}>
			<Box sx={{ width:"60%",display: "flex", flexDirection: "column" }}>
				<Typography variant="h4" gutterBottom>Count : {counterStore.title}</Typography>
				<Typography variant="h5">The count is: {counterStore.count}</Typography>

				<ButtonGroup sx={{ mt: "2rem" }}>
					<Button variant="contained" color="success" onClick={() => { counterStore.increment() }}> Increment </Button>
					<Button variant="contained" color="primary" onClick={() => { counterStore.increment(5) }}> Increment by 5</Button>
					<Button variant="contained" color="error" onClick={() => { counterStore.decrement() }}> Decrement </Button>
				</ButtonGroup>
			</Box>
			<Paper elevation={4} sx={{width:"40%", p:4} }>
				<Typography variant="h3">Counter Events : {counterStore.getTotalCount}</Typography>
				<List>
					{counterStore.events.map((e, i) => (<ListItemText key={i}> {e}</ListItemText>))}
				</List>
			</Paper>
		</Box>
	);
})

export default Counter;