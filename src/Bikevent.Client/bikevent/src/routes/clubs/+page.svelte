<script>
	// @ts-nocheck

	import Body from '../body.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	export let data;
	console.log(data);
</script>

<Body>
	<p class="text-lg dark:text-white">Clubs</p>
	<Table striped={true}>
		<TableHead>
			<TableHeadCell>Club Name</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>President</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.clubs as club}
				<TableBodyRow>
					<TableBodyCell>{club.nameOf}</TableBodyCell>
					<TableBodyCell>{club.description}</TableBodyCell>
					<TableBodyCell>{club.president}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Body>
