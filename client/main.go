package main

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

type Loras = []map[string]map[string]string

var (
	// refinersSDXL []string = []string{"sd_xl_refiner_1.0_f16.ckpt", "sd_xl_refiner_1.0_q6p_q8p.ckpt"}
	// controlsFlux []string = []string{"controlnet_jasper_ai_upscaler_flux_1_dev_1.0_f16.ckpt", "pulid_0.9_eva02_clip_l14_336_f16.ckpt"}
	loras Loras = []map[string]map[string]string{
		{
			"flux": {
				"Jesse":        "jessed_600_lora_f16.ckpt",
				"Amateur":      "amateur_lora_f16.ckpt",
				"Oil Painting": "bichu_v0612_lora_f16.ckpt",
				"Dani":         "daniflux_lora_f16.ckpt",
				"Dani2":        "daniflux1000_lora_f16.ckpt",
			},
			"sd1_5": {
				"Add More Details": "add_more_details__detail_enhancer___tweaker__lora_f16.ckpt",
				"Geometric":        "geometric_pattern_v1_lora_f16.ckpt",
				"Graffiti Tattoo":  "graffiti_tattoo_000005_lora_f16.ckpt",
				"Tattoo":           "tattoozfczfc_v1.1_5640_lora_f16.ckpt",
				"Face Tattoo":      "nlo_facetattoo_v1_lora_f16.ckpt",
				"8-Step":           "hyper_sd_v1.x_8_step_lora_f16.ckpt",
				"4-Step":           "hyper_sd_v1.x_4_step_lora_f16.ckpt",
				"Dani4":            "danilora_1500_lora_f32.ckpt",
				"Turbo":            "tcd_sd_v1.5_lora_f16.ckpt",
			},
			"sdxl": {
				"LCM":         "lcm_sd_xl_base_1.0_lora_f16.ckpt",
				"8-Step":      "hyper_sdxl_8_step_lora_f16.ckpt",
				"DmD2":        "dmd2_sdxl_4_step_lora_f16.ckpt",
				"SDXL Render": "sdxl_render_v2.0_lora_f16.ckpt",
				"Turbo":       "tcd_sd_xl_base_1.0_lora_f16.ckpt",
			},
			"video": {},
			"sd3_5": {},
			"sd2_0": {},
		},
	}
	models = map[string]map[string]string{
		"sd2_0": {
			"SD V2 (SD2.0 Inpainting)": "sd_v2.0_inpainting_f16.ckpt",
		},
		"flux": {
			"Flux.1 8-bit (Flux)": "flux_1_schnell_q5p.ckpt",
		},
		"sd1_5": {
			"SD V1.5 (SD1.5 Inpainting)":      "sd_v1.5_inpainting_f16.ckpt",
			"Dreamshaper (SD1.5)":             "dreamshaper_v8_f16.ckpt",
			"Counterfeit (SD1.5)":             "counterfeit_v3.0_f16.ckpt",
			"Spiderverse (SD1.5)":             "spiderverse_v1_f16.ckpt",
			"F222 (SD1.5)":                    "f222_f16.ckpt",
			"Hassanblend (SD1.5)":             "hassanblend_v1.5.1.2_f16.ckpt",
			"Juggernaut (SD1.5)":              "juggernaut_reborn_f16.ckpt",
			"Realistic Vision V5 (SD1.5)":     "realistic_vision_v5.1_f16.ckpt",
			"DnD Classes and Species (SD1.5)": "dnd_classes_and_species_f16.ckpt",
			"Studio Ghibli (SD1.5)":           "ghibli_v1_f16.ckpt",
			"Sam Does Art (SD1.5)":            "samdoesart_v3_f16.ckpt",
			"Ink Punk (SD1.5)":                "inkpunk_v2_f16.ckpt",
			"Classic Disney (SD1.5)":          "classicanim_v1_f16.ckpt",
			"Seek Art Mega (SD1.5)":           "seek_art_mega_v1_f16.ckpt",
			"Aloe Veras Simpmaker3K1 (SD1.5)": "aloeveras_simpmaker_3k1_f16.ckpt",
			"Supermarionation (SD1.5)":        "supermarionation_v2_f16.ckpt",
			"Pixar/Modern Disney (SD1.5)":     "modi_v1_f16.ckpt",
			"Midjourney (SD1.5)":              "mdjrny_v4_f16.ckpt",
			"Papercut (SD1.5)":                "papercut_v1_f16.ckpt",
			"Analog (SD1.5)":                  "analog_v1_f16.ckpt",
			"3D Model Redshift (SD1.5)":       "redshift_v1_f16.ckpt",
			"Rev Animated (SD1.5)":            "rev_animated_v1.22_f16.ckpt",

			"Anime Anything (SD1.5)":   "anything_v3_f16.ckpt",
			"Juggernaut 8-bit (SD1.5)": "juggernaut_reborn_q6p_q8p.ckpt",
			"Dani (SD1.5)":             "dani_f32.ckpt",
			"Spidermike (SD1.5)":       "spidermike_f32.ckpt",
			"DJ (SD1.5)":               "dj_f16.ckpt",
		},
		"sdxl": {
			"Playground (SDXL)":             "playground_v2.5_f16.ckpt",
			"Kwai Kolors (SDXL Inpainting)": "kwai_kolors_inpainting_1.0_f16.ckpt",
			"Fooocus (SDXL Inpainting)":     "fooocus_inpaint_sd_xl_v2.6_f16.ckpt",
			"Kwai Kolors (SDXL)":            "kwai_kolors_1.0_f16.ckpt",
			"PixelWave 10 (SDXL)":           "pixelwave_10_f16.ckpt",
			"Playground V2 (SDXL)":          "playground_v2_f16.ckpt",
			"RealVisXL (SDXL)":              "realvisxl_v4.0_f16.ckpt",
			"JuggernautXL (SDXL)":           "juggernaut_xl_v9_f16.ckpt",
			"AnimagineXL (SDXL)":            "animagine_xl_v3.1_f16.ckpt",
			"iCatcher Realistic (SDXL)":     "icatcher_realistic_f16.ckpt",
		},
		"sd3_5": {
			"SD V3.5 Turbo": "sd3_large_turbo_3.5_q6p.ckpt",
		},
		"video": {
			"Video (SVD)": "svd_i2v_xt_1.1_f16.ckpt",
		},
	}
	samplers  = []string{"Euler A Trailing", "DPM++ 2M Karras", "Euler a", "DPM++ SDE Karras", "UniPC", "PLMS", "DDIM", "LCM", "Euler A Substep", "DPM++ SDE Substep", "TCD", "DPM++ 2M Trailing", "DPM++ SDE Trailing", "DDIM Trailing", "DPM++ 2M AYS", "DPM++ SDE AYS", "Euler A AYS"}
	seedmodes = []string{"Scale Alike", "Legacy", "NVIDIA GPU Compatible", "Torch CPU Compatible"}
	// upscalers = []string{"null", "esrgan_4x_universal_upscaler_v2_sharp_f16.ckpt", "4x_ultrasharp_f16.ckpt"}
)

func main() {

	// selectedModelType := "SD1.5"
	myApp := app.New()
	gradient := canvas.NewHorizontalGradient(color.White, color.RGBA{255, 0, 125, 0})
	myWindow := myApp.NewWindow("Grid Layout")
	myWindow.SetContent(gradient)
	myWindow.Resize(fyne.NewSize(1200, 700))
	// myWindow.SetFixedSize(true)
	outerGrid := layout.NewGridLayoutWithColumns(2)
	leftGrid := layout.NewVBoxLayout()
	rightGrid := layout.NewGridLayoutWithRows(2)
	leftGridRow1 := layout.NewGridLayoutWithRows(2)
	leftGridRow2 := layout.NewGridLayoutWithColumns(2)
	leftGridRow3 := layout.NewGridLayoutWithColumns(2)
	leftGridRow4 := layout.NewGridLayoutWithColumns(2)
	leftGridRow5 := layout.NewGridLayoutWithColumns(3)
	leftGridRow6 := layout.NewGridLayoutWithColumns(3)
	leftGridRow7 := layout.NewGridLayoutWithColumns(3)
	leftGridRow8 := layout.NewGridLayoutWithColumns(2)

	// leftGridRow9 := layout.NewGridLayoutWithRows(2)
	// lgr9Row1 := layout.NewGridLayoutWithColumns(2)
	// lgr9Row2 := layout.NewGridLayoutWithColumns(3)
	leftGridRow11 := layout.NewGridLayoutWithColumns(2)
	leftGridRow12 := layout.NewGridLayoutWithColumns(2)
	refinementContainer := container.New(leftGridRow12)
	upscaleContainer := container.New(leftGridRow11)
	// controlsContainer := container.New(leftGridRow9)
	// controlsTopContainer := container.New(lgr9Row1)
	// controlsBottomContainer := container.New(lgr9Row2)
	// controlsContainer.Add(controlsTopContainer)
	// controlsContainer.Add(controlsBottomContainer)
	lorasContainer := container.New(leftGridRow8)
	stepsGuidanceSamplerContainer := container.New(leftGridRow7)
	sizeContainer := container.New(leftGridRow6)
	strengthContainer := container.New(leftGridRow5)
	modelContainer := container.New(leftGridRow4)
	additionalStyleContainer := container.New(leftGridRow3)
	promptContainer := container.New(leftGridRow2)
	clipSkipSharpnessContainer := container.New(leftGridRow1)
	rightGridRow1 := layout.NewGridLayoutWithColumns(1)
	rightGridRow2 := layout.NewGridLayoutWithColumns(1)
	leftContainer := container.New(leftGrid)
	scrollContainer := container.NewVScroll(leftContainer)
	rightContainer := container.New(rightGrid)
	leftContainer.Add(promptContainer)
	leftContainer.Add(additionalStyleContainer)
	leftContainer.Add(modelContainer)
	leftContainer.Add(strengthContainer)
	leftContainer.Add(sizeContainer)
	leftContainer.Add(lorasContainer)
	// leftContainer.Add(controlsContainer)
	leftContainer.Add(clipSkipSharpnessContainer)
	leftContainer.Add(stepsGuidanceSamplerContainer)
	leftContainer.Add(refinementContainer)
	leftContainer.Add(upscaleContainer)
	rightRow1 := container.New(rightGridRow1)
	rightRow2 := container.New(rightGridRow2)
	rightContainer.Add(rightRow1)
	rightContainer.Add(rightRow2)
	outerContainer := container.New(outerGrid)
	outerContainer.Add(scrollContainer)
	outerContainer.Add(rightContainer)
	myWindow.SetContent(outerContainer)
	//refinement
	// refinementLeft := container.New(layout.NewVBoxLayout())
	// refinementRight := container.New(layout.NewVBoxLayout())
	// refinementContainer.Add(refinementLeft)
	// refinementContainer.Add(refinementRight)
	// refinementLeft.Add(widget.NewLabel("Refinement"))
	// refinementsWidget := widget.NewSelect([]string{}, func(s string) {
	// })
	// refinementLeft.Add(refinementsWidget)
	// refinementRight.Add(widget.NewLabel("Refiner Start"))
	// refinementRight.Add(widget.NewSlider(0, 100))
	//upscale
	// upscaleLeft := container.New(layout.NewVBoxLayout())
	upscaleRight := container.New(layout.NewVBoxLayout())
	// upscaleContainer.Add(upscaleLeft)
	upscaleContainer.Add(upscaleRight)
	// upscaleLeft.Add(widget.NewLabel("Upscaler"))
	// upscalersWidget := widget.NewSelect(upscalers, func(s string) {
	// })
	// upscaleLeft.Add(upscalersWidget)
	upscaleRight.Add(widget.NewLabel("Shift"))
	upscaleRight.Add(widget.NewSlider(0.1, 8.0))
	//controls
	// controlsTopLeft := container.New(layout.NewVBoxLayout())
	// controlsTopRight := container.New(layout.NewVBoxLayout())
	// controlsTopContainer.Add(controlsTopLeft)
	// controlsTopContainer.Add(controlsTopRight)
	// controlsTopLeft.Add(widget.NewLabel("Controls"))
	// controlsWidget := widget.NewSelect([]string{}, func(s string) {
	// })
	// controlsTopLeft.Add(controlsWidget)
	// controlsTopRight.Add(widget.NewLabel("Type"))
	// controlsTopRight.Add(widget.NewSelect([]string{"None"}, func(s string) {
	// }))
	// controlsBottomLeft := container.New(layout.NewVBoxLayout())
	// controlsBottomRight := container.New(layout.NewVBoxLayout())
	// controlsBottomMiddle := container.New(layout.NewVBoxLayout())

	// controlsBottomContainer.Add(controlsBottomLeft)
	// controlsBottomContainer.Add(controlsBottomMiddle)
	// controlsBottomContainer.Add(controlsBottomRight)
	// controlsBottomLeft.Add(widget.NewLabel("Weight"))
	// controlsBottomLeft.Add(widget.NewSlider(0, 100))
	// controlsBottomMiddle.Add(widget.NewLabel("Start"))
	// controlsBottomMiddle.Add(widget.NewSlider(0, 100))
	// controlsBottomRight.Add(widget.NewLabel("End"))
	// controlsBottomRight.Add(widget.NewSlider(0, 100))
	//loras
	lorasLeft := container.New(layout.NewVBoxLayout())
	lorasRight := container.New(layout.NewVBoxLayout())
	lorasContainer.Add(lorasLeft)
	lorasContainer.Add(lorasRight)
	lorasLeft.Add(widget.NewLabel("Loras"))
	lorasWidget := widget.NewSelect([]string{}, func(s string) {
	})
	lorasLeft.Add(lorasWidget)
	lorasRight.Add(widget.NewLabel("Strength"))
	lorasRight.Add(widget.NewSlider(0, 100))
	//stepsGuidanceSampler
	stepsGuidanceSamplerLeft := container.New(layout.NewVBoxLayout())
	stepsGuidanceSamplerMiddle := container.New(layout.NewVBoxLayout())
	stepsGuidanceSamplerRight := container.New(layout.NewVBoxLayout())
	stepsGuidanceSamplerContainer.Add(stepsGuidanceSamplerLeft)
	stepsGuidanceSamplerContainer.Add(stepsGuidanceSamplerMiddle)
	stepsGuidanceSamplerContainer.Add(stepsGuidanceSamplerRight)
	stepsGuidanceSamplerLeft.Add(widget.NewLabel("Steps"))
	stepsGuidanceSamplerLeft.Add(widget.NewSlider(1, 150))
	stepsGuidanceSamplerMiddle.Add(widget.NewLabel("Guidance"))
	// input number
	stepsGuidanceSamplerMiddle.Add(widget.NewSlider(0, 25))
	stepsGuidanceSamplerRight.Add(widget.NewLabel("Sampler"))
	// select
	samplersWidget := widget.NewSelect(samplers, func(s string) {
	})
	stepsGuidanceSamplerRight.Add(samplersWidget)
	//size
	sizeLeft := container.New(layout.NewVBoxLayout())
	sizeRight := container.New(layout.NewVBoxLayout())
	sizeContainer.Add(sizeLeft)
	sizeContainer.Add(sizeRight)
	aspectRatioLayout := layout.NewGridLayoutWithRows(3)
	aspectRatioContainer := container.New(aspectRatioLayout)
	sizeLeft.Add(widget.NewLabel("Aspect Ratio"))
	sizeLeft.Add(aspectRatioContainer)
	aspectRatioRowLayout := layout.NewGridLayoutWithColumns(3)
	aspectRatioRow1Container := container.New(aspectRatioRowLayout)
	aspectRatioRow2Container := container.New(aspectRatioRowLayout)
	aspectRatioRow3Container := container.New(aspectRatioRowLayout)
	aspectRatioContainer.Add(aspectRatioRow1Container)
	aspectRatioContainer.Add(aspectRatioRow2Container)
	aspectRatioContainer.Add(aspectRatioRow3Container)
	aspectRatioRow1Container.Add(widget.NewButton("1:2", func() {
	}))
	aspectRatioRow1Container.Add(widget.NewButton("2:3", func() {
	}))
	aspectRatioRow1Container.Add(widget.NewButton("3:4", func() {
	}))
	aspectRatioRow2Container.Add(widget.NewButton("4:5", func() {
	}))
	aspectRatioRow2Container.Add(widget.NewButton("1:1", func() {
	}))
	aspectRatioRow2Container.Add(widget.NewButton("5:4", func() {
	}))
	aspectRatioRow3Container.Add(widget.NewButton("4:3", func() {
	}))
	aspectRatioRow3Container.Add(widget.NewButton("3:2", func() {
	}))
	aspectRatioRow3Container.Add(widget.NewButton("2:1", func() {
	}))
	sizeRight.Add(widget.NewLabel("Size"))
	sizeLayout := layout.NewGridLayoutWithRows(2)
	sizeContainer.Add(sizeRight)
	sizeRightContainer := container.New(sizeLayout)
	sizeRight.Add(sizeRightContainer)
	sizeTopLayout := layout.NewGridLayoutWithColumns(3)
	sizeBottomLayout := layout.NewGridLayoutWithColumns(2)
	sizeTopContainer := container.New(sizeTopLayout)
	sizeBottomContainer := container.New(sizeBottomLayout)
	sizeRightContainer.Add(sizeTopContainer)
	sizeRightContainer.Add(sizeBottomContainer)
	sizeTopContainer.Add(widget.NewButton("S", func() {
	}))
	sizeTopContainer.Add(widget.NewButton("M", func() {
	}))
	sizeTopContainer.Add(widget.NewButton("L", func() {
	}))
	sizeBottomContainer.Add(container.NewVBox(widget.NewLabel("Width"), widget.NewEntry()))
	sizeBottomContainer.Add(container.NewVBox(widget.NewLabel("Height"), widget.NewEntry()))
	//strength
	strengthLeft := container.New(layout.NewVBoxLayout())
	strengthRight := container.New(layout.NewVBoxLayout())
	strengthContainer.Add(strengthLeft)
	strengthContainer.Add(strengthRight)
	strengthLeft.Add(widget.NewLabel("Strength"))
	strengthLeft.Add(widget.NewSlider(0, 100))
	strengthRight.Add(widget.NewLabel("Seed Mode"))
	seedModesWidget := widget.NewSelect(seedmodes, func(s string) {
	})
	strengthRight.Add(seedModesWidget)
	//model
	modelLeftTop := container.New(layout.NewVBoxLayout())
	modelLeftBottom := container.New(layout.NewVBoxLayout())
	modelLeft := container.New(layout.NewVBoxLayout())
	modelLeft.Add(modelLeftTop)
	modelLeft.Add(modelLeftBottom)
	modelRight := container.New(layout.NewVBoxLayout())
	modelContainer.Add(modelLeft)
	modelContainer.Add(modelRight)
	modelLeftTop.Add(widget.NewLabel("Base Model"))
	modelTypes := make([]string, len(models))
	i := 0
	for k := range models {
		modelTypes[i] = k
		i++
	}
	modelsWidget := widget.NewSelect([]string{}, func(s string) {
	})

	modelTypesWidget := widget.NewSelect(modelTypes, func(s string) {
		modelNames := make([]string, len(models[s]))
		i := 0
		for k := range models[s] {
			modelNames[i] = k
			i++
		}

		modelsWidget.SetOptions(modelNames)

		for _, v := range loras {
			for k := range v {
				if k == s {
					loraNames := make([]string, len(v[s]))
					i := 0
					for k := range v[s] {
						loraNames[i] = k
						i++
					}
					lorasWidget.SetOptions(loraNames)
				}
			}

		}

	})
	modelLeftTop.Add(modelTypesWidget)

	modelLeftBottom.Add(modelsWidget)
	modelRight.Add(widget.NewLabel("Seed"))
	modelRight.Add(widget.NewSlider(0, 999999999999999999999))
	//additionalStyle
	additionalStyleLeft := container.New(layout.NewVBoxLayout())
	additionalStyleRight := container.New(layout.NewVBoxLayout())
	additionalStyleContainer.Add(additionalStyleLeft)
	additionalStyleContainer.Add(additionalStyleRight)
	additionalStyleLeft.Add(widget.NewLabel("Additional Style"))
	additionalStyleLeft.Add(widget.NewSelect([]string{"None", "Abstract Art", "GTA", "Zelda", "Pokemon", "Psychadelic", "Photorealistic", "Cartoon", "Anime", "Comic", "Manga", "Disney", "Pixar", "Dreamworks", "Nickelodeon", "Warner Bros", "Studio Ghibli", "Adult Swim", "Simpsons", "Family Guy", "South Park", "Rick and Morty", "Bob's Burgers", "Archer", "Futurama", "Spongebob", "Looney Tunes", "Tom and Jerry", "Flintstones", "Jetsons", "Scooby Doo", "Powerpuff Girls", "Dexter's Lab", "Johnny Bravo", "Courage the Cowardly Dog", "Ed Edd n Eddy", "Samurai Jack", "Teen Titans", "Avatar", "Ben 10", "Danny Phantom", "Fairly Odd Parents", "Jimmy Neutron", "My Life as a Teenage Robot", "Invader Zim", "Rugrats", "Doug", "Ren and Stimpy", "Rocko's Modern Life", "Aaahh Real Monsters", "Hey Arnold", "CatDog", "Wild Thornberrys", "Rocket Power", "As Told by Ginger", "Chalkzone", "Avatar: The Last Airbender", "Danny Phantom", "El Tigre", "Tak and the Power of Juju", "Back at the Barnyard"}, func(s string) {
	}))
	additionalStyleRight.Add(widget.NewLabel("Multiplier"))
	additionalStyleRight.Add(widget.NewSlider(0, 4))
	//prompt
	promptLeft := container.New(layout.NewVBoxLayout())
	promptRight := container.New(layout.NewVBoxLayout())
	promptContainer.Add(promptLeft)
	promptContainer.Add(promptRight)
	promptLeft.Add(widget.NewLabel("Prompt"))
	promptLeft.Add(widget.NewEntry())
	promptRight.Add(widget.NewLabel("Negative"))
	promptRight.Add(widget.NewEntry())
	//clipSkipSharpness
	clipSkipSharpnessLeft := container.New(layout.NewVBoxLayout())
	clipSkipSharpnessRight := container.New(layout.NewVBoxLayout())
	clipSkipSharpnessContainer.Add(clipSkipSharpnessLeft)
	clipSkipSharpnessContainer.Add(clipSkipSharpnessRight)
	clipSkipSharpnessLeft.Add(widget.NewLabel("Clip Skip"))
	clipSkipSharpnessLeft.Add(widget.NewSlider(0, 23))
	clipSkipSharpnessRight.Add(widget.NewLabel("Sharpness"))
	clipSkipSharpnessRight.Add(widget.NewSlider(0, 30))

	myWindow.ShowAndRun()
}
