import {
	DropdownBox,
	DropDownOpener,
	DropdownOption,
	DropdownWithButtons,
	LorasList,
	Row,
	Section,
} from "../styled-components";
import loras from "./loras.json";
import { useEffect, useState } from "react";
import { useSettings } from "../useSettings";
import { FloppyDisk, FloppyDiskRegular } from "../../icons/fa-icons";

function LoraSection() {
	const [open, setOpen] = useState(false);
	const [lorasToShow, setLorasToShow] = useState(loras);
	const { settings, setSettings, setModalOpen } = useSettings();
	useEffect(() => {
		const loadExtraLorasFromLocalStorage = async () => {
			const lorasFromLocalStorage = localStorage.getItem("loras");
			if (lorasFromLocalStorage) {
				const lorasToAdd = JSON.parse(lorasFromLocalStorage);
				setLorasToShow({
					flux: {
						...loras.flux,
						...lorasToAdd.flux,
					},
					sd1_5: {
						...loras.sd1_5,
						...lorasToAdd.sd1_5,
					},
					sd2_0: {
						...loras.sd2_0,
						...lorasToAdd.sd2_0,
					},
					sd3_5: {
						...loras.sd3_5,
						...lorasToAdd.sd3_5,
					},
					sdxl: {
						...loras.sdxl,
						...lorasToAdd.sdxl,
					},
					video: {
						...loras.video,
						...lorasToAdd.video,
					},
				});
			}
		};
		loadExtraLorasFromLocalStorage();
	}, []);
	return (
		<Section>
			<Row>
				<label htmlFor="loras">Loras</label>

				<DropdownWithButtons>
					<DropDownOpener
						onClick={() => {
							setOpen(!open);
						}}
					>
						Add
					</DropDownOpener>
					<DropdownBox id="loras-dropdown" open={open}>
						{lorasToShow &&
							Object.entries(
								lorasToShow[settings.model_category as keyof typeof loras]
							).map(([key, value]) => (
								<DropdownOption key={key}>
									{key}
									<button
										onClick={() => {
											let lorasInUse = settings.loras && settings.loras.slice();

											if (!Array.isArray(lorasInUse)) {
												lorasInUse = [];
											}
											lorasInUse.push({
												weight: 1,
												file:
													typeof value === "string"
														? value
														: JSON.stringify(value),
												key,
											});

											setSettings(prev => ({
												...prev,
												loras: lorasInUse,
											}));
											setOpen(!open);
										}}
									>
										Add
									</button>
								</DropdownOption>
							))}

						<button onClick={() => setModalOpen(true)}>
							<FloppyDisk fill="#000" stroke="#000" strokeWidth={0} />
							<FloppyDiskRegular fill="#000" stroke="#000" strokeWidth={0} />
						</button>
					</DropdownBox>
				</DropdownWithButtons>
				<LorasList>
					{settings.loras &&
						settings.loras.map((lora, index) => (
							<li key={index}>
								<span>{lora.key}</span>
								<span className="input_label">
									{Math.ceil(lora.weight * 100)}%
								</span>
								<input
									type="range"
									min={0}
									max={1}
									step={0.01}
									value={lora.weight}
									onChange={event => {
										const lorasInUse = settings.loras && settings.loras.slice();
										if (!Array.isArray(lorasInUse)) {
											return;
										}
										lorasInUse[index].weight = parseFloat(event.target.value);
										setSettings(prev => ({
											...prev,
											loras: lorasInUse,
										}));
									}}
								/>
								<button
									onClick={() => {
										if (!Array.isArray(settings.loras)) {
											return;
										}
										const lorasInUse = settings.loras.slice();
										lorasInUse.splice(index, 1);
										setSettings(prev => ({
											...prev,
											loras: lorasInUse,
										}));
									}}
								>
									Remove
								</button>
							</li>
						))}
				</LorasList>
			</Row>
		</Section>
	);
}

export default LoraSection;
