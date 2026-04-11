import { useEffect, useMemo, useState } from "react";
import { Button, Column, Row, Section } from "../../shared/styled-components";
import {
	createSettingsOption,
	deleteSettingsOption,
	getSettingsFileContent,
	saveSettingsFileContent,
} from "../../../helpers/api";

type SettingsFileName =
	| "models"
	| "loras"
	| "samplers"
	| "seed-modes"
	| "upscalers"
	| "refiners"
	| "controls";

const SETTINGS_FILES: SettingsFileName[] = [
	"models",
	"loras",
	"controls",
	"refiners",
	"samplers",
	"seed-modes",
	"upscalers",
];

type OptionRow = {
	id: number;
	[key: string]: string | number;
};

const fieldsByType: Record<SettingsFileName, string[]> = {
	"models": ["model_name", "model_type", "filename"],
	"loras": ["lora_name", "model_type", "filename"],
	"controls": ["control_name", "model_type", "file"],
	"refiners": ["refiner_name", "model_type", "filename"],
	"samplers": ["sampler_name"],
	"seed-modes": ["seed_mode_name"],
	"upscalers": ["upscaler_name"],
};

const labelByType: Record<SettingsFileName, string> = {
	"models": "Models",
	"loras": "LoRAs",
	"controls": "Controls",
	"refiners": "Refiners",
	"samplers": "Samplers",
	"seed-modes": "Seed Modes",
	"upscalers": "Upscalers",
};

const SettingsFilesEditorSection = () => {
	const [selectedFile, setSelectedFile] = useState<SettingsFileName>("models");
	const [rows, setRows] = useState<OptionRow[]>([]);
	const [newRow, setNewRow] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [status, setStatus] = useState("");

	const fields = useMemo(() => fieldsByType[selectedFile], [selectedFile]);

	useEffect(() => {
		const loadFile = async () => {
			setStatus("");
			setIsLoading(true);
			try {
				const content = await getSettingsFileContent(selectedFile);
				setRows(content as OptionRow[]);
				const blank: Record<string, string> = {};
				fieldsByType[selectedFile].forEach(field => {
					blank[field] = "";
				});
				setNewRow(blank);
			} catch (error) {
				setStatus(`Failed to load: ${(error as Error).message}`);
			} finally {
				setIsLoading(false);
			}
		};
		loadFile();
	}, [selectedFile]);

	const updateCell = (id: number, field: string, value: string) => {
		setRows(prev =>
			prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
		);
	};

	const onSaveRow = async (row: OptionRow) => {
		setIsSaving(true);
		setStatus("");
		try {
			const payload: Record<string, string | number> = { id: row.id };
			fields.forEach(field => {
				payload[field] = String(row[field] ?? "");
			});
			const saved = await saveSettingsFileContent(selectedFile, payload);
			setRows(prev => prev.map(item => (item.id === row.id ? saved : item)));
			setStatus(`${labelByType[selectedFile]} row saved.`);
		} catch (error) {
			setStatus(`Save failed: ${(error as Error).message}`);
		} finally {
			setIsSaving(false);
		}
	};

	const onCreateRow = async () => {
		setIsSaving(true);
		setStatus("");
		try {
			const payload: Record<string, string> = {};
			fields.forEach(field => {
				payload[field] = (newRow[field] ?? "").trim();
			});
			const created = await createSettingsOption(selectedFile, payload);
			setRows(prev => [...prev, created]);
			const blank: Record<string, string> = {};
			fields.forEach(field => {
				blank[field] = "";
			});
			setNewRow(blank);
			setStatus(`${labelByType[selectedFile]} row added.`);
		} catch (error) {
			setStatus(`Create failed: ${(error as Error).message}`);
		} finally {
			setIsSaving(false);
		}
	};

	const onDeleteRow = async (id: number) => {
		setIsSaving(true);
		setStatus("");
		try {
			await deleteSettingsOption(selectedFile, id);
			setRows(prev => prev.filter(row => row.id !== id));
			setStatus(`${labelByType[selectedFile]} row deleted.`);
		} catch (error) {
			setStatus(`Delete failed: ${(error as Error).message}`);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Section>
			<Column style={{ flexDirection: "column", gap: "12px" }}>
				<Row>
					<label htmlFor="settings-file-select">Settings Options Admin</label>
					<select
						id="settings-file-select"
						value={selectedFile}
						onChange={event => {
							setSelectedFile(event.target.value as SettingsFileName);
						}}
					>
						{SETTINGS_FILES.map(fileName => (
							<option key={fileName} value={fileName}>
								{labelByType[fileName]}
							</option>
						))}
					</select>
				</Row>

				<Row>
					<label>New {labelByType[selectedFile]} Row</label>
					<div
						style={{
							display: "grid",
							gap: "8px",
							gridTemplateColumns: `repeat(${Math.max(fields.length, 2)}, minmax(120px, 1fr))`,
						}}
					>
						{fields.map(field => (
							<input
								key={`new-${field}`}
								placeholder={field}
								value={newRow[field] ?? ""}
								onChange={event => {
									setNewRow(prev => ({ ...prev, [field]: event.target.value }));
								}}
							/>
						))}
						<Button className="solid" disabled={isSaving} onClick={onCreateRow}>
							Add
						</Button>
					</div>
				</Row>

				{isLoading ?
					<p>Loading rows...</p>
				:	<Row>
						<label>Current {labelByType[selectedFile]}</label>
						<div
							style={{ display: "flex", flexDirection: "column", gap: "8px" }}
						>
							{rows.map(row => (
								<div
									key={row.id}
									style={{
										display: "grid",
										gap: "8px",
										alignItems: "center",
										gridTemplateColumns: `80px repeat(${fields.length}, minmax(140px, 1fr)) 90px 90px`,
									}}
								>
									<span>ID {row.id}</span>
									{fields.map(field => (
										<input
											key={`${row.id}-${field}`}
											value={String(row[field] ?? "")}
											onChange={event =>
												updateCell(row.id, field, event.target.value)
											}
										/>
									))}
									<Button disabled={isSaving} onClick={() => onSaveRow(row)}>
										Save
									</Button>
									<Button
										disabled={isSaving}
										onClick={() => onDeleteRow(row.id)}
									>
										Delete
									</Button>
								</div>
							))}
							{rows.length === 0 && <p>No rows found for this option type.</p>}
						</div>
					</Row>
				}

				<Row
					style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}
				>
					<span>{isSaving ? "Saving..." : status}</span>
				</Row>
			</Column>
		</Section>
	);
};

export default SettingsFilesEditorSection;
