const customStyle = [
	'Style of the movie "The Grand Budapest Hotel", by Wes Anderson',
	"Dynamic Marvel comic book layout with multiple scene transitions, rich character expressions, and storytelling through irregular panel design. Bold, graphic illustration with a strong visual hierarchy and narrative flow",
	"Hyper-realistic photography, Vibrant, saturated colors like electric pinks, greens, and yellows with sharp, high-contrast shadows. A bold, energetic style that feels modern and dynamic, reminiscent of pop art or street art",
	"Hyperrealistic photographs with a tilt-shift effect, blurring the background and creating a miniature world feel. Bright, cheerful colours and playful subjects", // Miniature World Photography
	"Abstract art with bold geometric shapes and vibrant colours. Clean lines and simple compositions create a modern and minimalist aesthetic", // Geometric Abstraction
	"Double exposure photography blending two or more images together. Creates a surreal, layered effect with ghostly figures and dreamlike landscapes", // Double Exposure Art
	"Detailed pencil drawings with a focus on light and shadow. Realistic portraits and still life drawings with a high level of detail and precision", // Realistic Pencil Drawings
	"Surreal digital art with a dreamlike quality. Whimsical, fantastical scenes that blend reality and imagination. Rich, vibrant colours and intricate details", // Surreal Digital Art
	"Impressionist paintings with loose brushwork and vibrant colours. Soft, blurred edges and a focus on light and colour create a sense of movement and emotion", // Impressionist Paintings
	"Abstract photography that focuses on shape, form, and colour. Bold compositions and close-up details create visually striking and dynamic images", // Abstract Photography
	"Hyperrealistic paintings that mimic the look of high-resolution photographs. Detailed, lifelike images that capture every nuance and texture with precision", // Hyperrealistic Paintings
	"Minimalist sculptures that focus on clean lines, geometric shapes, and negative space. Simple, elegant forms that evoke a sense of calm and balance", // Minimalist Sculptures
	"Mixed media collages that combine various materials and techniques. Layers of texture and colour create depth and visual interest", // Mixed Media Collages
	"Surrealist drawings that explore the subconscious mind and dream-like imagery. Unusual, fantastical scenes that challenge reality and logic", // Surrealist Drawings
	"Street art murals that use public spaces as a canvas for social commentary and self-expression. Bold, graphic images that engage and provoke viewers", // Street Art Murals
	"Abstract sculptures that experiment with shape, form, and material. Organic, fluid shapes that challenge traditional notions of sculpture", // Abstract Sculptures
	"Photorealistic portraits that capture the essence of a person with incredible detail and accuracy. Expressive, emotive images that reveal the subject's inner world", // Photorealistic Portraits
	"Landscape paintings that depict the natural world in all its beauty and diversity. Vibrant, atmospheric scenes that transport viewers to another place and time", // Landscape Paintings
	"Digital illustrations that blend traditional drawing techniques with modern technology. Playful, imaginative images that push the boundaries of visual storytelling", // Digital Illustrations
	"Abstract paintings that explore color, texture, and composition. Dynamic, energetic works that invite viewers to interpret and engage with the artwork", // Abstract Paintings
	"Sculptural installations that transform ordinary spaces into immersive environments. Interactive, site-specific works that challenge viewers to rethink their surroundings", // Sculptural Installations
	"Photography that captures the world in stunning detail. Striking images that reveal the beauty and complexity of everyday life", // Photography
	"Illustrations that tell a story through visual narrative. Playful, imaginative images that engage viewers and spark their imagination", // Illustrations
	"Mixed media artworks that combine various materials and techniques. Layers of texture and color create depth and visual interest", // Mixed Media Artworks
	"Surreal paintings that blend reality and fantasy. Dreamlike scenes that challenge the viewer's perception of the world", // Surreal Paintings
	"Abstract drawings that explore shape, line, and form. Expressive, dynamic works that invite viewers to interpret and engage with the artwork", // Abstract Drawings
	"Street art that uses public spaces as a canvas for social commentary and self-expression. Bold, graphic images that engage and provoke viewers", // Street Art
	"Hyperrealistic sculptures that mimic the look of high-resolution photographs. Detailed, lifelike images that capture every nuance and texture with precision", // Hyperrealistic Sculptures
	"Minimalist paintings that focus on clean lines, geometric shapes, and negative space. Simple, elegant works that evoke a sense of calm and balance", // Minimalist Paintings
	"Impressionist drawings that focus on light and color. Soft, blurred edges and a focus on atmosphere create a sense of movement and emotion", // Impressionist Drawings
	"Photorealistic landscapes that capture the beauty and diversity of the natural world. Vibrant, atmospheric scenes that transport viewers to another place and time", // Photorealistic Landscapes
];

const style = [
	"Hyper-realistic photography, captured with Hasselblad XCD, masterpieces of photography, life-like textures, high-resolution clarity, and true-to-life colors", //Hasselblad Master Photography
	"Bright, white-dominant images with soft shadows and very subtle details. The focus is on high key lighting with minimal color, with just a hint of pastel shades", //Soft High-Key Photography
	"Hyper-realistic photography, Bold lighting, sharp contrasts, and dramatic poses. Emphasizes luxury and glamour with sleek, polished visuals. Perfect for fashion magazine aesthetics", //High-Fashion Portrait
	"Rich, vibrant colors with a slight warmth, with slightly saturated tones of red, yellow, and green. classic Kodak color film", //Kodak Film Aesthetic
	"A vibrant cinematic palette with strong orange and teal tones. Fine film grain and gaussian noise", //Orange-Teal Cinematic
	"Desaturated color palette with slight orange and blue undertones, shadow is very light. Fine film grain and gaussian noise to give a gritty, atmospheric quality", //Desaturated Cinematic
	"Grainy, low-saturation film aesthetics with soft textures and muted colors, evoking the look of old films. Faded tones and nostalgic. Fine film grain and gaussian noise", //Vintage Cinematic
	"Symmetrical compositions with pastel and muted tones, featuring warm yellows, soft pinks, and teal blues. Strong focus on meticulous framing and vintage aesthetics. Fine film grain and gaussian noise", //Retro Aesthetic Cinematic
	"Desaturated, cold color palette dominated by greys, muted blues, and browns. Minimal contrast, with a focus on bleak, overcast lighting and a sense of emptiness", //Cold Fashion
	"A cool-toned, industrial palette dominated by metallic grays, blues, and muted whites. Sharp details and reflections give a sleek, futuristic appearance with a subtle, polished sheen", //Cold Steel Futurism
	"Hyper-realistic photography, Deep reds, blacks, and purples, with an emphasis on dramatic shadows. The style creates a mysterious, romantic atmosphere, with a rich, almost baroque aesthetic", //Dark Gothic Romance
	"Dark, atmospheric visuals characterized by deep blues, vibrant oranges. Fine film grain and gaussian noise add texture. Cinematic compositions with a focus on shadows and reflections", //Futuristic Noir Aesthetic
	"Hyper-realistic photography, rich and warm colors with deep reds, golds, and dark shadows. Heavy textures, intricate details, and ornate patterns evoke the luxury and grandeur of baroque art", //Opulent Baroque
	"Soft pastel colors (pinks, light blues, lavender) blended with smooth gradients. Dreamy and surreal, often with a misty or glowing effect. Minimal contrast, focusing on soft, harmonious tones", //Pastel Dreamscape
	"Minimalist conceptual illustration, flat design with bold shapes, vibrant colors, and clean lines. Perfect for fashion ads, offering a trendy, modern look", //Conceptual Illustration
	"Ethereal 3D fantasy artwork with a vibrant color palette. Dreamy, whimsical worlds featuring purples, blues, and golds. Mystical elements evoke a magical atmosphere", //Mystical Fantasy
	"Bright, vibrant 3D cartoon artwork with a Pixar-inspired style. High attention to realistic details, smooth textures, and expressive characters", //Pixar Cartoon Universe
	"Dynamic anime art style with vibrant, saturated colors, detailed character designs, bold outlines, and lively, expressive scenes. A balance of stylization and realism", //Vibrant Anime
];

const light = [
	"Sunny day",
	"Cloudy day",
	"Light from side",
	"Light from top",
	"Light from back",
	"Bright light",
	"Golden hour sunlight",
	"Subtle candlelight",
	"Dramatic spotlight cutting through darkness",
	"Neon light",
	"Dim light",
	"Soft and diffused light",
	"Cinematic lighting",
	"Warm light",
	"Cool and bluish light",
	"Gentle and soft glow",
	"Sharp and focused beam of light",
	"Pulsing light",
	"Bright and glaring light",
	"Soft and ambient light",
	"Shimmering and scattered light",
	"Muted and low light",
	"natural light",
	"Bright and radiant light",
	"Dappled and broken light",
	"Hazy and diffused glow",
	"contrasting light",
	"Faint and barely-there light",
	"Glowing and ethereal light",
	"subtle light",
];

const youngTypes = (["boy", "girl", "androgynous child"].join(", ") + ", ")
	.repeat(75)
	.split(", ")
	.slice(0, 75);

console.log(youngTypes);
const adultTypes = [
	"man",
	"woman",
	"androgynous man",
	"androgynous woman",
	"transgender man",
	"transgender woman",
	"drag queen",
	"drag king",
	"gender neutral person",
]
	.join(", ")
	.repeat(75)
	.split(", ")
	.slice(0, 75);
const age = ["young", "adult"];

const youngStart = [
	"A baby ",
	"A toddler ",
	"An 8 year old ",
	"An 11 year old preteen ",
	"A tween 13 year old ",
	"A young teen ",
	"A 17 year old ",
];
const adultStart = [
	"A 25 year old ",
	"A 35 year old ",
	"A middle-aged ",
	"A 55 year old ",
	"An 85 year old ",
	"A 150 year old ",
	"An ancient rotting corpse of a ",
];
const strangeTypes = [
	"ghostly",
	"zombie",
	"vampire",
	"werewolf",
	"demon",
	"witch",
	"wizard",
	"fairy",
	"mermaid",
	"centaur",
	"robot",
	"alien",
	"mutant",
	"cyborg",
	"slime monster",
	"skeleton",
	"mummy",
	"goblin",
	"troll",
	"gremlin",
	"ghoul",
	"banshee",
	"siren",
	"harpy",
	"spirit",
];
const wereTypes = [
	"dog",
	"kitten",
	"cat",
	"horse",
	"parrot",
	"rabbit",
	"deer",
	"fox",
	"bear",
	"wolf",
	"lion",
	"dragon",
	"squirrel",
	"monkey",
	"panda",
	"penguin",
	"raccoon",
	"cheetah",
	"owl",
	"llama",
	"koala",
	"flamingo",
	"bison",
	"mouse",
].map(a => {
	return `were${a}`;
});
let people = age
	.map(a => {
		if (a === "young") {
			return youngTypes
				.map(t => {
					return youngStart.map(s => {
						return `${s}${t}`;
					});
				})
				.concat(
					strangeTypes.map(t => {
						return youngStart.map(s => {
							return `${s}${t}`;
						});
					})
				)
				.concat(
					wereTypes.map(t => {
						return youngStart.map(s => {
							return `${s}${t}`;
						});
					})
				);
		} else {
			return adultTypes
				.map(t => {
					return adultStart.map(s => {
						return `${s}${t}`;
					});
				})
				.concat(
					strangeTypes.map(t => {
						return adultStart.map(s => {
							return `${s}${t}`;
						});
					})
				)
				.concat(
					wereTypes.map(t => {
						return adultStart.map(s => {
							return `${s}${t}`;
						});
					})
				);
		}
	})
	.flat()
	.flat();

const types = [
	"dwarfism",
	"albinism",
	"vitiligo",
	"braces",
	"a hearing aid",
	"a cochlear implant",
	"a facial scar",
	"without a nose",
	"a cleft lip",
	"burn scars",
	"acne",
	"acne scars",
	"freckles",
	"a birthmark",
	"a port-wine stain",
	"rosacea",
	"melasma",
	"an underbite",
	"an overbite",
	"a missing tooth",
	"gapped teeth",
	"chipped teeth",
	"anorexia",
	"a drooping eyelid",
	"a cleft palate scar",
];
if (Math.random() < 0.01) {
	people = people
		.map(p => {
			const total = [];
			types.forEach(t => {
				total.push(`${p} with ${t}`);
			});
			total.push(p);
			return total;
		})
		.flat();
}
if (Math.random() < 0.01) {
	people = people
		.map(p => {
			const total = [];
			types.forEach(t => {
				total.push(`${p} and ${t}`);
			});
			total.push(p);
			return total;
		})
		.flat();
}
const faceShape = [
	"a round face",
	"a square face",
	"an oval face",
	"a heart-shaped face",
	"a diamond-shaped face",
	"a long face",
	"a triangular face",
	"a rectangular face",
	"a pear-shaped face",
	"a square jawline",
	"a prominent chin",
	"a strong jawline",
	"a soft jawline",
	"a defined jawline",
	"a narrow jawline",
	"a wide jawline",
	"a chiseled jawline",
	"a rounded jawline",
	"a pointed chin",
	"a cleft chin",
	"a dimpled chin",
	"a double chin",
	"a sharp chin",
	"a square chin",
	"a receding chin",
	"a weak chin",
	"prominent cheekbones",
	"high cheekbones",
	"low cheekbones",
	"full cheeks",
	"sunken cheeks",
	"chubby cheeks",
	"hollow cheeks",
	"a wide forehead",
	"a narrow forehead",
	"a high forehead",
	"a low forehead",
	"a prominent forehead",
	"a receding hairline",
	"a low hairline",
	"a high hairline",
	"a widow's peak",
	"a broad forehead",
	"a sloping forehead",
	"a flat forehead",
	"a rounded forehead",
	"a square forehead",
	"a heart-shaped forehead",
];
const allPeople: string[] = [];
for (let i = 0; i < 1000; i++) {
	let person = people[Math.floor(Math.random() * people.length)];
	const face = faceShape[Math.floor(Math.random() * faceShape.length)];
	person = person + " with " + face;

	const eyes = [
		"no eyes",
		"one eye",
		"an eye patch",
		"heterochromia",
		"shy eyes",
		"deep-set eyes",
		"almond-shaped eyes",
		"round eyes",
		"large eyes",
		"small eyes",
		"hooded eyes",
		"wide-set eyes",
		"close-set eyes",
		"upturned eyes",
		"downturned eyes",
		"prominent eyes",
		"bulging eyes",
		"sunken eyes",
		"droopy eyes",
		"squinty eyes",
		"bright eyes",
		"dull eyes",
		"sparkling eyes",
		"piercing eyes",
		"intense eyes",
		"expressive eyes",
		"lifeless eyes",
		"soulful eyes",
		"haunting eyes",
		"dreamy eyes",
		"sleepy eyes",
		"alert eyes",
		"tired eyes",
		"bloodshot eyes",
		"watery eyes",
		"glassy eyes",
		"dilated eyes",
		"narrow eyes",
		"wide eyes",
		"hooded eyes",
		"droopy eyes",
		"squinty eyes",
		"bright eyes",
		"dull eyes",
		"sparkling eyes",
		"piercing eyes",
		"intense eyes",
		"expressive eyes",
		"lifeless eyes",
		"soulful eyes",
		"haunting eyes",
		"dreamy eyes",
		"sleepy eyes",
		"alert eyes",
		"tired eyes",
		"bloodshot eyes",
		"watery eyes",
		"glassy eyes",
		"dilated eyes",
		"narrow eyes",
		"wide eyes",
		"hooded eyes",
		"droopy eyes",
		"squinty eyes",
		"bright eyes",
		"dull eyes",
		"sparkling eyes",
		"piercing eyes",
		"intense eyes",
		"expressive eyes",
		"lifeless eyes",
		"soulful eyes",
		"haunting eyes",
		"dreamy eyes",
		"sleepy eyes",
		"alert eyes",
		"tired eyes",
		"bloodshot eyes",
		"watery eyes",
		"glassy eyes",
		"dilated eyes",
		"narrow eyes",
		"wide eyes",
		"hooded eyes",
		"droopy eyes",
		"squinty eyes",
		"bright eyes",
		"dull eyes",
		"sparkling eyes",
	];
	let eye = eyes[Math.floor(Math.random() * eyes.length)];
	if (eye !== "no eyes" && eye !== "heterochromia") {
		const color = [
			"blue",
			"green",
			"brown",
			"hazel",
			"amber",
			"gray",
			"black",
			"pale blue",
			"dark brown",
			"light brown",
			"deep green",
			"emerald green",
			"olive green",
			"honey brown",
			"golden brown",
			"chocolate brown",
			"sapphire blue",
			"turquoise blue",
			"steel gray",
			"charcoal black",
			"icy blue",
			"stormy gray",
			"moss green",
			"forest green",
			"caramel brown",
			"copper brown",
			"mahogany brown",
			"ruby red",
			"amethyst purple",
			"silver gray",
			"golden yellow",
		][Math.floor(Math.random() * 31)];

		eye = eye.replace("eyes", color + " eyes");
	}
	person = person + ", " + eye;
	const facialHair = [
		"a full beard",
		"a goatee",
		"a soul patch",
		"a five o'clock shadow",
		"a mustache",
		"a chinstrap beard",
		"stubble",
		"a bushy beard",
		"a neatly trimmed beard",
		"a scruffy beard",
		"a long beard",
		"a short beard",
		"a thick beard",
		"a thin beard",
		"a patchy beard",
		"a well-groomed beard",
		"a wild beard",
		"a clean-shaven face",
		"a beard and mustache",
	];
	const facial = facialHair[Math.floor(Math.random() * facialHair.length)];
	if (Math.random() < 0.1) {
		person = person + ", " + facial;
	}
	const hair = [
		"short, spiky hair",
		"curly brown hair",
		"straight blond hair",
		"short curly hair",
		"long, shaggy hair",
		"short, buzzed hair",
		"a man-bun",
		"a trendy undercut and tousled, light brown hair",
		"vibrant purple hair styled in a messy quiff",
		"shoulder-length curly hair",
		"a sleek pompadour",
		"buzzed sides and a top knot",
		"shoulder-length straight hair",
		"a chic, messy bun",
		"slicked-back dark hair",
		"asymmetrical short hair dyed a bold color",
		"wavy dark hair",
		"a modern fade haircut",
		"tousled sandy blonde hair",
		"messy, layered hair",
		"vibrant teal spikes in their hair",
		"wavy, medium-length hair",
		"straight, parted hair",
		"medium-length curly hair",
		"short, styled hair",
		"a shaved head",
		"close-cropped hair",
		"slightly graying hair",
		"a receding hairline",
		"thinning hair",
		"shoulder-length hair tied back",
		"thinning gray hair",
		"a full head of white hair",
		"a long, white ponytail",
		"a bald head",
		"short, straight hair",
		"curly pigtails",
		"wavy, dark hair",
		"a bob cut",
		"long, braided hair",
		"dyed pink hair",
		"shoulder-length wavy hair",
		"straight, black hair",
		"long, flowing hair",
		"a pixie cut",
		"short, bobbed hair",
		"thick, curly hair",
		"short, spiked hair",
		"sleek, straight hair",
		"medium-length hair",
		"long, straight hair",
		"shoulder-length curls",
		"deep red hair styled in loose waves",
		"platinum blonde pixie cut",
		"shoulder-length black curls",
		"sleek, straight dark brown hair",
		"auburn hair styled in a messy bun",
		"pastel pink hair",
		"chestnut hair in loose waves",
		"honey blonde, beachy waves",
		"jet-black hair in a sleek bob",
		"golden-brown hair pulled into a high ponytail",
		"lilac-tinted curls framing their face",
		"chocolate brown hair in soft curls",
		"dark blue, straight hair falling to their shoulders",
		"silver hair in a short, edgy bob",
		"subtle waves",
		"shoulder-length wavy hair",
		"a high ponytail",
		"graying hair",
		"short hair",
		"sharp features, high cheekbones",
		"shoulder-length hair",
		"a curly bob",
		"a graying bob",
		"long, graying hair",
		"thin white hair",
		"their hair in a tight bun",
		"a long white braid",
	];
	const hairStyle = hair[Math.floor(Math.random() * hair.length)];
	person = person + ", " + hairStyle;

	const eyeshadow = [
		"a smokey eye",
		"a cut crease",
		"a halo eye",
		"a glittery eye",
		"a matte eye",
		"a glossy eye",
		"a colorful eye",
		"a neutral eye",
		"a bold eye",
		"a natural eye",
		"a dramatic eye",
		"a subtle eye",
		"a winged eye",
		"a cat eye",
		"a graphic eye",
		"a double winged eye",
		"a gradient eye",
		"a monochromatic eye",
		"a metallic eye",
		"a matte eye",
		"a shimmer eye",
	];
	const eyeShadow = eyeshadow[Math.floor(Math.random() * eyeshadow.length)];

	const lipstick = [
		"a bold red lip",
		"a soft pink lip",
		"a nude lip",
		"a coral lip",
		"a berry lip",
		"a plum lip",
		"a mauve lip",
		"a peach lip",
		"a brown lip",
		"a burgundy lip",
		"a fuchsia lip",
		"a magenta lip",
		"a hot pink lip",
		"a deep red lip",
		"a wine lip",
		"a chocolate lip",
		"a caramel lip",
		"a rose lip",
		"a tangerine lip",
		"a lavender lip",
		"a metallic gold lip",
	];
	const lipstickOn = lipstick[Math.floor(Math.random() * lipstick.length)];

	const blush = [
		"a rosy blush",
		"a peachy blush",
		"a coral blush",
		"a pink blush",
		"a berry blush",
		"a mauve blush",
		"a bronze blush",
		"a golden blush",
		"a champagne blush",
		"a lavender blush",
		"a plum blush",
		"a terracotta blush",
		"a brick red blush",
		"a dusty rose blush",
		"a soft pink blush",
		"a warm brown blush",
		"a cool pink blush",
		"a bright red blush",
		"a deep wine blush",
		"a light peach blush",
		"a dark berry blush",
		"a subtle nude blush",
		"a bold fuchsia blush",
		"a natural flush",
		"a dramatic contour",
		"a soft highlight",
		"a glowing complexion",
		"a matte finish",
	];

	const blushOn = blush[Math.floor(Math.random() * blush.length)];

	if (Math.random() < 0.1) {
		person = person + ", " + eyeShadow;
		person = person + ", " + lipstickOn;
		person = person + ", " + blushOn;
	}
	const complexion = [
		"a fair complexion",
		"a light complexion",
		"a medium complexion",
		"an olive complexion",
		"a tan complexion",
		"a deep complexion",
		"a warm undertone",
		"a cool undertone",
		"a neutral undertone",
		"a pink undertone",
		"a yellow undertone",
		"a golden undertone",
		"a peach undertone",
		"a red undertone",
		"a blue undertone",
		"a green undertone",
		"a purple undertone",
		"a gray undertone",
		"a brown undertone",
		"a black undertone",
		"a white undertone",
		"a silver undertone",
		"a bronze undertone",
		"a copper undertone",
		"a rose gold undertone",
		"smooth skin",
		"flawless skin",
		"blemished skin",
		"acne-prone skin",
		"sensitive skin",
		"oily skin",
		"dry skin",
		"combination skin",
		"mature skin",
		"youthful skin",
		"dull skin",
		"radiant skin",
		"glowing skin",
		"dewy skin",
		"matte skin",
		"textured skin",
		"wrinkled skin",
		"scarred skin",
		"tattooed skin",
		"pierced skin",
		"freckled skin",
		"sunburned skin",
		"tanned skin",
		"pale skin",
		"dark skin",
		"light skin",
		"medium skin",
		"deep skin",
		"porcelain skin",
		"bronzed skin",
		"caramel skin",
		"ebony skin",
		"alabaster skin",
		"mahogany skin",
		"olive skin",
		"sandy skin",
		"peaches and cream skin",
		"honey skin",
		"chocolate skin",
		"coffee skin",
		"cream skin",
		"cocoa skin",
		"caramel skin",
		"butterscotch skin",
		"toffee skin",
		"cinnamon skin",
		"mocha skin",
		"copper skin",
		"bronze skin",
		"amber skin",
		"sable skin",
		"sand skin",
		"beige skin",
	];
	const skinType = complexion[Math.floor(Math.random() * complexion.length)];
	person = person + ", " + skinType;
	const expression = [
		"a mischievous grin",
		"an intriguing gaze",
		"a warm smile",
		"a stoic expression",
		"a playful smirk",
		"a serious frown",
		"a thoughtful look",
		"a surprised expression",
		"a confident smirk",
		"a shy smile",
		"a mysterious gaze",
		"a friendly grin",
		"a stern expression",
		"a curious look",
		"a joyful smile",
		"a sad frown",
		"a neutral expression",
		"a worried look",
		"a cheeky grin",
		"a pensive gaze",
		"a delighted smile",
		"a disappointed frown",
		"a blank expression",
		"a shocked look",
		"a proud smile",
		"a calm expression",
		"a scared look",
		"a sly grin",
		"a contemplative gaze",
		"a radiant smile",
		"a disapproving frown",
		"a vacant expression",
		"a startled look",
		"a beaming smile",
		"a stern expression",
		"a puzzled look",
		"a playful grin",
		"a thoughtful gaze",
	];
	const facialExpression =
		expression[Math.floor(Math.random() * expression.length)];
	person = person + ", and " + facialExpression;

	allPeople.push(person);
}

const animal = [
	"dog",
	"kitten",
	"cat",
	"horse",
	"parrot",
	"rabbit",
	"deer",
	"fox",
	"bear",
	"wolf",
	"lion",
	"dragon",
	"squirrel",
	"monkey",
	"panda",
	"penguin",
	"raccoon",
	"cheetah",
	"owl",
	"llama",
	"koala",
	"flamingo",
	"bison",
	"mouse",
];

const specialCharacters = [
	"Donald John Trump",
	"Albert Einstein",
	"Elon Musk",
	"Mahatma Gandhi",
	"Steve Jobs",
	"Mickey Mouse",
	"Sherlock Holmes",
	"Harry Potter",
	"James Bond",
	"Indiana Jones",
	"Darth Vader",
	"Frodo Baggins",
	"Jack Sparrow",
	"Katniss Everdeen",
	"Tony Stark",
	"Walter White",
	"Lara Croft",
	"Homer Simpson",
	"Santa Claus",
	"Winnie the Pooh",
	"The Joker",
	"Wonder Woman",
	"Batman",
	"Daredevil",
	"Superman",
	"The Terminator",
	"Alexander the Great",
	"Napoleon Bonaparte",
	"Winston Churchill",
	"Bruce Lee",
	"Muhammad Ali",
	"Charlie Chaplin",
	"Michael Jackson",
	"Luke Skywalker",
	"Hermione Granger",
	"Scarlet Witch",
	"Doctor Strange",
	"Captain America",
	"John Wick",
	"Buzz Lightyear",
];

const groupPerson = [
	"A middle-aged couple",
	"A group of three small children",
	"A group of teenagers",
	"A family of four",
	"Two siblings, one older",
	"A group of young boys",
	"A pair of best friends",
	"An elderly couple",
	"A mother with her young daughter",
	"A father and son",
	"A group of children of various ages",
	"A young couple",
	"A police officer and a thief",
	"A robot and a human",
	"A pirate and a sailor",
	"Donald John Trump and Elon Musk",
	"Minions with their leader Gru",
	"Harry Potter, Hermione Granger, and Ron Weasley",
	"The Avengers team (Iron Man, Captain America, Thor, and Hulk)",
	"SpongeBob SquarePants and Patrick Star",
	"The Guardians of the Galaxy crew (Star-Lord, Gamora, Drax, Rocket, and Groot)",
	"Sherlock Holmes and Dr. John Watson",
	"Buzz Lightyear and Woody from Toy Story",
	"Mario and Luigi from the Mario Bros",
	"The X-Men team (Wolverine, Cyclops, Storm, Jean Grey, Professor X)",
	"Shrek, Donkey, and Fiona",
	"Ash Ketchum, Pikachu, and Misty from Pokémon",
	"Rick and Morty from Rick and Morty",
	"The Teenage Mutant Ninja Turtles (Leonardo, Michelangelo, Donatello, Raphael, and Splinter)",
	"The Simpsons family (Homer, Marge, Bart, Lisa, and Maggie)",
	"Mickey Mouse, Donald Duck, and Goofy",
	"Po, Tigress, and Master Shifu from Kung Fu Panda",
];

const maleDailyClothesP = [
	"business suit with a sharp tie",
	"casual T-shirt and shorts",
	"a tuxedo with a red bowtie",
	"a flannel shirt and rugged boots",
	"leather jacket and aviator sunglasses",
	"a long trench coat",
	"modern, minimalist black suit",
	"sporty outfit with sneakers",
	"classic white shirt and denim overalls",
	"a cowboy's hat, boots, and spurs",
	"a police officer's uniform with a badge",
	"a soldier's camouflage uniform and helmet",
	"a training suit",
	"a teacher's cardigan and khaki pants",
	"a warm plaid shirt",

	"slim-fit navy blazer with tailored trousers and a crisp white shirt, paired with leather loafers",
	"casual bomber jacket with a graphic tee and distressed slim-fit jeans, finished with white sneakers",
	"lightweight linen shirt with rolled-up sleeves, paired with khaki chinos and desert boots",
	"tailored wool overcoat worn over a turtleneck sweater and dark jeans, with Chelsea boots",
	"vintage-inspired denim jacket with a plain black tee and cargo pants, accessorized with a beanie and aviator sunglasses",
	"sleek leather biker jacket over a fitted white henley, paired with dark-wash skinny jeans and ankle boots",
	"minimalist monochrome outfit with a black crewneck sweater, tapered jogger pants, and stylish sneakers",
	"layered look with a cozy knit cardigan over a basic tee, slim-fit jeans, and suede desert boots",
	"sporty athleisure set with a zip-up track jacket, fitted joggers, and running shoes",
	"modern streetwear outfit featuring an oversized hoodie, ripped jeans, and high-top sneakers",
	"lightweight bomber jacket over a striped Breton shirt, paired with cuffed chinos and white canvas sneakers",
	"tailored corduroy blazer with a wool crewneck sweater, slim-fit trousers, and leather brogues",
	"oversized flannel shirt worn open over a graphic tee and skinny jeans, with high-top sneakers",
	"fitted parka jacket layered over a hoodie, paired with tapered cargo pants and chunky hiking boots",
	"sleek knit polo shirt tucked into slim cropped trousers, accessorized with a leather belt and loafers",

	"traditional Japanese kimono with a wide obi belt",
	"Scottish tartan kilt with a sporran",
	"Middle Eastern kaftan with delicate patterns",
	"a Viking tunic with fur accents",
	"a Maasai shuka with beaded jewelry",
];

const femaleDailyClothesP = [
	"flowing silk gown adorned with intricate embroidery",
	"elegant evening gown with sparkling sequins",
	"vintage polka dot dress",
	"summer dress with floral patterns",
	"casual jeans and a futuristic jacket",
	"a comfy hoodie and jeans",
	"a Renaissance-era gown with puffed sleeves",
	"a business suit with a pencil skirt",
	"sporty outfit with leggings and sneakers",
	"a summer sundress with floral patterns",
	"a glasses and cozy sweater",
	"a teacher's cardigan and pencil skirt",

	"oversized blazer in a muted pastel tone, paired with high-waisted tailored pants and a silk camisole",
	"cropped leather moto jacket worn over a fitted turtleneck sweater and high-rise skinny jeans, complemented by ankle boots",
	"flowy midi skirt with abstract prints, paired with a tucked-in ribbed sweater and platform sneakers",
	"relaxed-fit trench coat over a form-fitting knit dress, paired with knee-high leather boots",
	"high-waisted wide-leg trousers with a tucked-in satin blouse, accessorized with a statement belt and pointed-toe heels",
	"sleek oversized coat paired with slim-fit jeans, a tucked-in basic tee, and chunky sneakers",
	"layered look with an oversized denim jacket over a cropped hoodie, paired with biker shorts and trendy sneakers",
	"modern co-ord set with a crop top and matching high-waisted pants, styled with minimalistic jewelry and slide sandals",
	"classic trench coat worn over a pleated midi dress, paired with ankle strap heels",
	"off-the-shoulder knit sweater tucked into a faux leather mini skirt, finished with knee-high boots",
	"tailored double-breasted blazer paired with wide-leg culottes, and finished with heeled ankle boots",
	"longline cardigan layered over a fitted tee, high-rise mom jeans, and chunky sneakers",
	"fitted denim jacket paired with a floral maxi dress and lace-up sandals, perfect for casual outings",
	"statement puff-sleeve blouse tucked into high-rise flared jeans, accessorized with a crossbody bag and loafers",
	"sleek wrap dress in bold geometric patterns, styled with minimal jewelry and pointed-toe flats",

	"Chinese qipao",
	"Indian sari with golden thread details",
	"a Spanish flamenco dress with ruffles",
	"an embroidered Russian sarafan",
	"a colorful Mexican huipil with floral patterns",
	"a traditional African dashiki",
	"a Middle Eastern kaftan with delicate patterns",
	"a Viking tunic with fur accents",
	"a traditional Hawaiian hula skirt made of leaves",

	"a Victorian lace dress with a corset",
	"a Baroque ball gown with intricate ruffles",
	"a 1920s flapper dress with fringe",
	"a 1950s poodle skirt with a scarf",
	"a 1960s mod dress with bold geometric patterns",
	"a medieval peasant's tunic and belt",
	"a medieval nun's robe and cross",
];

const maleDailyClothes = [...maleDailyClothesP, ...femaleDailyClothesP];
const femaleDailyClothes = [...femaleDailyClothesP, ...maleDailyClothesP];

const maleFashionClothesP = [
	"casual T-shirt and shorts",
	"a flannel shirt and rugged boots",
	"leather jacket and aviator sunglasses",
	"a long trench coat",
	"sporty outfit with sneakers",
	"slim-fit navy blazer with tailored trousers and a crisp white shirt, paired with leather loafers",
	"casual bomber jacket with a graphic tee and distressed slim-fit jeans, finished with white sneakers",
	"lightweight linen shirt with rolled-up sleeves, paired with khaki chinos and desert boots",
	"tailored wool overcoat worn over a turtleneck sweater and dark jeans, with Chelsea boots",
	"vintage-inspired denim jacket with a plain black tee and cargo pants, accessorized with a beanie and aviator sunglasses",
	"sleek leather biker jacket over a fitted white henley, paired with dark-wash skinny jeans and ankle boots",
	"minimalist monochrome outfit with a black crewneck sweater, tapered jogger pants, and stylish sneakers",
	"layered look with a cozy knit cardigan over a basic tee, slim-fit jeans, and suede desert boots",
	"sporty athleisure set with a zip-up track jacket, fitted joggers, and running shoes",
	"modern streetwear outfit featuring an oversized hoodie, ripped jeans, and high-top sneakers",
	"lightweight bomber jacket over a striped Breton shirt, paired with cuffed chinos and white canvas sneakers",
	"tailored corduroy blazer with a wool crewneck sweater, slim-fit trousers, and leather brogues",
	"oversized flannel shirt worn open over a graphic tee and skinny jeans, with high-top sneakers",
	"fitted parka jacket layered over a hoodie, paired with tapered cargo pants and chunky hiking boots",
	"sleek knit polo shirt tucked into slim cropped trousers, accessorized with a leather belt and loafers",
];

const femaleFashionClothesP = [
	"vintage polka dot dress",
	"summer dress with floral patterns",
	"casual jeans and a futuristic jacket",
	"a comfy hoodie and jeans",
	"a business suit with a pencil skirt",
	"sporty outfit with leggings and sneakers",
	"a summer sundress with floral patterns",
	"a glasses and cozy sweater",
	"oversized blazer in a muted pastel tone, paired with high-waisted tailored pants and a silk camisole",
	"cropped leather moto jacket worn over a fitted turtleneck sweater and high-rise skinny jeans, complemented by ankle boots",
	"flowy midi skirt with abstract prints, paired with a tucked-in ribbed sweater and platform sneakers",
	"relaxed-fit trench coat over a form-fitting knit dress, paired with knee-high leather boots",
	"high-waisted wide-leg trousers with a tucked-in satin blouse, accessorized with a statement belt and pointed-toe heels",
	"sleek oversized coat paired with slim-fit jeans, a tucked-in basic tee, and chunky sneakers",
	"layered look with an oversized denim jacket over a cropped hoodie, paired with biker shorts and trendy sneakers",
	"modern co-ord set with a crop top and matching high-waisted pants, styled with minimalistic jewelry and slide sandals",
	"classic trench coat worn over a pleated midi dress, paired with ankle strap heels",
	"off-the-shoulder knit sweater tucked into a faux leather mini skirt, finished with knee-high boots",
	"tailored double-breasted blazer paired with wide-leg culottes, and finished with heeled ankle boots",
	"longline cardigan layered over a fitted tee, high-rise mom jeans, and chunky sneakers",
	"fitted denim jacket paired with a floral maxi dress and lace-up sandals, perfect for casual outings",
	"statement puff-sleeve blouse tucked into high-rise flared jeans, accessorized with a crossbody bag and loafers",
	"sleek wrap dress in bold geometric patterns, styled with minimal jewelry and pointed-toe flats",
];
const maleFashionClothes = [...maleFashionClothesP, ...femaleFashionClothesP];
const femaleFashionClothes = [...femaleFashionClothesP, ...maleFashionClothesP];

const maleFantasticClothesP = [
	"yellow raincoat with a hood shaped like a duck's head",
	"spacesuit-themed hoodie with star patches and shiny silver pants",
	"pirate hat with a parrot on the shoulder and matching striped shorts",
	"dinosaur-shaped backpack with matching dino-print sneakers",
	"shark-shaped hoodie with fin on the back and toothy hood",
	"robot-patterned jacket with buttons that look like gears",
	"superhero cape with matching mask and lightning-bolt patterned pants",
	"a black leather trench coat with silver accents and a high collar",
	"a royal outfit with a velvet doublet and gold embroidery, paired with a crimson cape",
	"a rugged explorer's outfit with a wide-brimmed hat, leather jacket, and heavy boots",
	"a tech-powered suit with glowing chest emblem, but the emblem is a giant smiling emoji",
	"a hammer-wielding warrior costume, but the hammer is a giant inflatable squeaky toy",
	"a hotdog costume with mustard and ketchup bottles as shoulder pads",
	"a giant banana suit with tiny monkeys hanging from the pockets",
	"a cowboy outfit where the hat is so big",
	"a knight's armor made entirely of oversized LEGO bricks",
	'a Coca-Cola can-shaped costume with the words "Hit Me" written on it',
	"a Roman gladiator's armor with a crested helmet",
	"a medieval peasant's tunic and belt",
	"a musketeer's tunic and feathered hat",
	"a knight's shining plate armor with a crest",
	"a Roman senator's toga with golden laurel crown",
	"a warrior's fur-lined cape and leather bracers",
	"a steampunk adventurer's outfit",
	"a futuristic bodysuit with armor plating",
	"a space captain's uniform with insignias",
	"a rebel fighter's rugged gear with gadgets",
	"a battle suit with laser gauntlets and shields",
	"a wizard's robe with a long staff and pointed hat",
	"a king's royal robe with a golden crown",
	"a farmer's overalls with muddy boots and a straw hat",
	"a pirate's eyepatch and long coat with a cutlass",
	"a ninja's stealthy black garb and mask",
	"a robot's metallic suit with LED lights",
	"a zombie's torn clothing with dirt and scars",
	"a mummy's bandages wrapped tightly with ancient hieroglyphs",
	"a jester's colorful outfit with a jingling hat",
	"a blacksmith's apron with gloves and a hammer",
	"a fisherman's waterproof jacket and boots",
	"a hunter's camo jacket and hat",
	"a journalist's notepad and fedora with a press badge",
	"a mechanic's greasy coveralls with a wrench",
	"a gardener's sunhat",
];

const femaleFantasticClothesP = [
	"duck-patterned bikini top with matching shorts",
	"white tank top with a colorful popcorn print",
	"cat-shaped hoodie with little ears and paw prints on the sleeves",
	"ice cream cone-patterned dress with a scoop-shaped handbag",
	"rainbow-striped overalls with star-shaped buttons and glittery sneakers",
	"ladybug-themed cape with a matching polka-dot dress",
	"a battle-ready leather suit with high boots and armored shoulder plates",
	"a watermelon slice dress with seeds that are tiny hidden pockets",
	'a Coca-Cola can-shaped costume with the words "Kiss Me" written on it',
	"a Victorian lace dress with a corset",
	"a Baroque ball gown with intricate ruffles",
	"a 1920s flapper dress with fringe",
	"a 1950s poodle skirt with a scarf",
	"a 1960s mod dress with bold geometric patterns",
	"a medieval peasant's tunic and belt",
	"a medieval nun's robe and cross",
	"a fairy's delicate dress made of flower petals",
	"a witch's dark, flowing gown and pointed hat",
	"a steampunk adventurer's outfit",
	"a futuristic bodysuit with glowing circuits",
	"a princess's flowing gown with jeweled tiara",
	"a knight's shining plate armor with a crest",
	"a queen's royal gown with a jeweled tiara",
	"a farmer's denim overalls with a wide-brimmed hat",
	"a pirate's bandana and corset with high boots",
	"a robot's futuristic silver outfit",
	"a zombie's tattered dress",
	"a jester's playful multicolored dress with bells",
	"a huntress's camo outfit with a bow and arrows",
	"a journalist's sleek trench coat",
	"a pilot's tailored aviator jacket with insignias",
	"a gardener's apron with gardening tools",
];

const maleFantasticClothes = [
	...maleFantasticClothesP,
	...femaleFantasticClothesP,
];
const femaleFantasticClothes = [
	...femaleFantasticClothesP,
	...maleFantasticClothesP,
];

const maleName = [
	"Xiao Dong",
	"Xiao Bin",
	"Kenta",
	"Hideto",
	"Son Kang-Dae",
	"Thi Tạ Hiền",
	"Pan Aduladej",
	"Pruitt Villeneuve",
	"Friedrick Brackmann",
	"Pietro Caponera",
	"Jasper Bergquist",
	"Tomas Rosten",
	"Pouya Hosseini",
	"Nikolaev",
	"Dequinn Harrell",
];

const femaleName = [
	"Xiao Na",
	"Xiao Han",
	"Mikami",
	"Kanako",
	"Ha Yun-Soo",
	"La Ngọc Lý",
	"Tidarat Taksin",
	"Vignetta Badour",
	"Leota Zobel",
	"Fabia Santomauro",
	"Elsa Widforss",
	"Helena Hoel",
	"Anna Qaedi",
	"Lidochka Vasilev",
	"Xemena Porter",
];

const commonDailyActions = [
	"looking surprised",
	"looking angry",
	"looking sad",
	"looking happy",
	"with a relaxed expression",
	"jump up happily",
	"hold a puppy",
	"waving energetically at the viewer",
	"petting a kitten",
	"giving a thumbs-up with confidence",
	"placing one hand over the chest",
	"blowing a kiss playfully",
	"making a heart shape with hands",
	"making a silly face with tongue out",
	"clapping hands enthusiastically",
];

const commonFashionActions = [
	"with a Saluki together",
	"sitting on the floor with legs extended, one arm draped casually over a knee",
	"standing tall, one hand raised above the head as the wind blows through the hair",
	"head tilted back, eyes closed",
	"hands in pockets, with a relaxed posture",
	"standing with one leg bent slightly, hand resting on the wall, gazing confidently",
	"one leg bent up, looking down with a soft smile",
	"standing on tiptoes, body slightly turned, arms crossed over the chest, with a determined gaze",
	"hands relaxed behind the back, shoulders leaning slightly, facing the viewer with a casual glance over the shoulder",
	"tilting forward slightly while holding the brim of a hat, one hand in a pocket, with a relaxed posture",
	"standing with legs crossed, one hand gently touching the chin in a thoughtful expression, gazing into the distance",
	"kneeling on a ground, body leaning forward with a playful expression",
	"half-crouching on the ground, hands resting casually on the knees, head tilted, exuding elegance and confidence",
	"one leg in front, arms swinging naturally with a wind-swept look, eyes focused ahead",
];

const commonFantasticActions = [
	"looking surprised",
	"looking angry",
	"looking happy",
	"crying sadly",
	"with a exaggerated expression, shouting",
	"with a playful and eccentric expression",
	"with a very fat figure, and being very cute",
	"jumping up happily",
	"floating in the air",
	"holding a puppy",
	"petting a kitten",
	"making a silly face with tongue out",
	"riding a lion",
	"holding a huge lollipop happily",
	"eating ice cream happily",
	"together with a Siamese cat",
	"together with a super big Garfield cat",
	"together with a wolf",
	"together with the Hulk",
	"together with a robot",
	"together with the Minions",
	"together with SpongeBob",
	"together with the Pikachu",
	"with a monkey sitting on their shoulder",
];

const dailyScenes: [string, string[]][] = [
	[
		"at a competitive eating contest",
		[
			"shoveling food into their mouth with impressive speed",
			"trying not to gag on the sheer volume of food consumed",
			"strategically pacing themself to outlast the competition",
			"experiencing a severe case of the meat sweats",
			"emerging victoriously, covered in food, but feeling strangely proud",
		],
	],
	[
		"at a lively bonfire on a cool autumn evening",
		[
			"roasting marshmallows over the fire",
			"telling stories and sharing laughter with friends",
			"warming their hands by the flames",
			"watching the embers glow in the darkness",
			"singing songs accompanied by a guitar",
		],
	],
	[
		"on a deserted road",
		[
			"riding a Harley",
			"driving a retro car",
			"riding a horse",
			"walking tiredly with a backpack",
			"jumping up and cheering",
		],
	],
	[
		"in a quiet suburban neighborhood",
		[
			"walking a dog down the sidewalk",
			"watering the lawn in front of a house",
			"chatting with a neighbor over the fence",
			"retrieving mail from the mailbox",
			"riding a bicycle down the street",
		],
	],
	[
		"in a cozy cafe on a rainy afternoon",
		[
			"sipping a warm beverage by the window",
			"reading a book in a comfortable armchair",
			"writing in a journal at a small table",
			"chatting with a friend over coffee",
			"watching the rain fall from inside",
		],
	],
	[
		"in a modern apartment with floor-to-ceiling windows",
		[
			"looking out at the city skyline",
			"watering plants near the window",
			"doing yoga in the living room",
			"cooking a meal in the modern kitchen",
			"relaxing on a sofa with a book",
		],
	],
	[
		"at a bustling farmers market",
		[
			"selecting fresh produce from a stall",
			"sampling local cheeses and jams",
			"carrying a woven basket filled with groceries",
			"talking to a farmer about their crops",
			"paying for goods with cash",
		],
	],
	[
		"on a train speeding through the countryside",
		[
			"looking out the window at the passing scenery",
			"reading a book in a train seat",
			"talking to a fellow passenger",
			"eating a snack from a packed lunch",
			"listening to music with headphones",
		],
	],
	[
		"in a grand city plaza with towering skyscrapers",
		[
			"taking photos of the surrounding buildings",
			"sitting on a bench and people-watching",
			"walking across the plaza towards a destination",
			"feeding pigeons gathered in the square",
			"checking a map for directions",
		],
	],
	[
		"in a cozy bedroom",
		[
			"sitting on the sofa and reading",
			"lying in bed in a daze",
			"leaning against the window",
			"smiling and sitting cross-legged on the bed",
			"taking clothes out of the closet",
		],
	],
	[
		"in a flower-filled meadow at dawn",
		[
			"walking from the field admiring the flowers",
			"taking photographs of the sunrise",
			"lying down in the grass and looking at the sky",
			"picking a bouquet of wildflowers",
			"watching butterflies flutter around the blossoms",
		],
	],
	[
		"on a tropical beach with crystal clear water",
		[
			"swimming in the ocean",
			"sunbathing on the sand",
			"walking along the shoreline",
			"building a sandcastle",
			"sipping a drink from a coconut",
		],
	],
	[
		"in a quaint bakery",
		[
			"looking at the pastries in the display case",
			"ordering a croissant and coffee",
			"carrying a bag of freshly baked bread",
			"sitting at a small table enjoying a treat",
		],
	],
	[
		"in a bustling airport terminal",
		[
			"checking in at the ticket counter",
			"walking through the terminal with luggage",
			"looking at the departure board",
			"sitting at the gate waiting for a flight",
			"buying a coffee from a kiosk",
		],
	],
	[
		"in a crowded subway station with commuters rushing,",
		[
			"walking quickly through the station",
			"standing on the platform waiting for a train",
			"moving through the crowd to board the subway",
		],
	],
	[
		"on a rooftop garden overlooking a bustling city",
		[
			"admiring the city view",
			"watering plants in the garden",
			"sitting on a bench and relaxing",
			"talking with a friend while enjoying the view",
			"taking photographs of the cityscape",
		],
	],
	[
		"in a modern art gallery with abstract sculptures",
		[
			"looking at a sculpture thoughtfully",
			"walks from the gallery observing the art",
			"discussing a sculpture with a companion",
		],
	],
	[
		"in a large greenhouse filled with exotic plants",
		[
			"walking amongst the plants",
			"taking photographs of the flowers",
			"watering plants with a watering can",
		],
	],
	[
		"at a horse stable in a countryside manor",
		[
			"grooming a horse",
			"leading a horse out of its stall",
			"petting a horse gently",
			"mucking out a stable",
			"carrying a saddle towards a horse",
		],
	],
	[
		"in a cozy cabin in the middle of a snowy forest",
		[
			"sitting by a crackling fireplace",
			"looking out the window at the snow-covered trees",
			"reading a book wrapped in a blanket",
			"drinking hot cocoa by the fire",
			"chopping wood outside the cabin",
		],
	],
	[
		"in a lush vineyard in the countryside",
		[
			"walking through the rows of grapevines",
			"sampling grapes from a vine",
			"carrying a basket of harvested grapes",
		],
	],
	[
		"at a train station in the middle of nowhere",
		["waiting on the platform for a train", "sitting on a bench with luggage"],
	],
	[
		"at a crowded amusement park with colorful rides",
		[
			"riding a roller coaster",
			"eating cotton candy",
			"playing carnival games",
		],
	],
	[
		"in a busy sports stadium",
		[
			"watching the game from the stands",
			"cheering for a team",
			"high-fiving fellow fans",
			"holding up a sign supporting the team",
		],
	],
	[
		"in a graffiti-covered alley in an industrial area",
		[
			"walking cautiously down the alley",
			"admiring the street art",
			"sketching in a notebook",
			"looking closely at a detailed piece of graffiti",
		],
	],
	[
		"on a calm lake surrounded by towering mountains",
		[
			"paddling a canoe across the lake",
			"fishing from a boat",
			"swimming in the lake",
			"sitting on the shore and enjoying the view",
		],
	],
	[
		"in a Viking village near a frozen fjord",
		[
			"walking between the wooden houses",
			"working on a fishing net by the shore",
			"chopping wood for a fire",
			"talking to another villager near a longboat",
		],
	],
	[
		"on a Victorian-era street filled with carriages",
		[
			"riding in a horse-drawn carriage",
			"walking along the cobblestone street",
			"greeting someone tipping their top hat",
			"carrying a parasol to shield from the sun",
		],
	],
	[
		"at a samurai dojo surrounded by cherry blossoms",
		[
			"practicing swordsmanship with a wooden katana",
			"meditating in the dojo garden",
			"bowing respectfully to a sensei",
		],
	],
	[
		"at an Egyptian temple with towering obelisks",
		[
			"walking through the temple ruins",
			"looking up at the hieroglyphics carved on the walls",
			"exploring the inner chambers of the temple",
		],
	],
	[
		"in a 1920s jazz club filled with dancing and music",
		[
			"dancing the Charleston",
			"sipping a cocktail at a table",
			"talking to someone at the bar",
			"snapping fingers to the rhythm of the music",
		],
	],
	[
		"in a medieval castle with stone walls and torches",
		[
			"walking through the castle halls",
			"looking out from a castle window",
			"holding a torch to light the way",
			"sitting at a long wooden table eating",
			"talking to a knight in armor",
		],
	],
	[
		"in a quiet suburban neighborhood",
		[
			"mowing the lawn",
			"playing with a child",
			"walking a dog down the street",
			"washing a car in the driveway",
			"talking to a neighbor over the fence",
		],
	],
	[
		"in a small-town diner with vintage decor",
		[
			"drinking coffee from a mug",
			"eating a slice of pie",
			"reading a newspaper at a booth",
			"talking to the waitress",
		],
	],
	[
		"in a sunny park with children playing",
		[
			"pushing a child on a swing",
			"sitting on a park bench reading a book",
			"having a picnic on the grass",
			"throwing a frisbee to a dog",
		],
	],
	[
		"in a farmer's field with ripe crops",
		[
			"harvesting crops by hand",
			"driving a tractor",
			"inspecting the crops",
			"carrying a basket of harvested vegetables",
			"walking through the field checking the soil",
		],
	],
	[
		"at a community swimming pool",
		[
			"swimming laps",
			"sunbathing on a lounge chair",
			"playing water volleyball",
			"diving off the diving board",
			"sitting on the edge of the pool dangling feet in the water",
		],
	],
	[
		"at a neighborhood block party",
		[
			"talking to neighbors",
			"eating food from the grill",
			"playing games with children",
			"dancing in the street",
		],
	],
	[
		"in a family living room with cozy furniture",
		[
			"watching television together",
			"playing board games",
			"reading books on the sofa",
			"talking and laughing together",
			"snuggling under a blanket",
		],
	],
	[
		"in a well-tended garden with blooming flowers",
		[
			"watering the flowers with a watering can",
			"pruning roses with gardening shears",
			"smelling the fragrant blooms",
			"walks from the garden paths",
			"sitting on a bench admiring the flowers",
		],
	],
	[
		"at a quaint coffee shop with outdoor seating",
		[
			"sipping coffee at a table outside",
			"reading a book in the sunshine",
			"chatting with a friend over coffee",
			"using a laptop at a table",
		],
	],
	[
		"at a playground with swings and slides",
		[
			"swinging on a swing set",
			"sliding down a slide",
			"climbing on the jungle gym",
			"playing in the sandbox",
		],
	],
	[
		"in a yoga studio",
		[
			"performing yoga poses",
			"meditating on a mat",
			"stretching on the floor",
			"drinking water from a bottle",
		],
	],
	[
		"at a riverside picnic with a checkered blanket",
		[
			"eating food from a picnic basket",
			"lying on a checkered blanket",
			"throwing rocks into the river",
			"reading a book by the water",
		],
	],
	[
		"in a vintage bookstore with wooden shelves",
		[
			"browsing the bookshelves",
			"reading a book in a comfy chair",
			"talking to the bookstore owner",
		],
	],
	[
		"on a peaceful nature trail through the woods",
		[
			"hiking along the trail",
			"taking photos of the scenery",
			"breathing in the fresh air",
		],
	],
	[
		"on a suburban street with autumn leaves",
		[
			"raking leaves into a pile",
			"walking on crunchy leaves",
			"riding a bike down the street",
		],
	],
	[
		"in a home garden with vegetable patches",
		[
			"watering the vegetable plants",
			"harvesting ripe vegetables",
			"weeding the garden beds",
			"tying tomato plants to stakes",
		],
	],
	[
		"at a local theater with a community play",
		[
			"watching the play from the audience",
			"applauding the actors",
			"talking to other audience members during intermission",
		],
	],
	[
		"at a pet store with a variety of animals",
		[
			"looking at the animals in cages and tanks",
			"holding a kitten",
			"choosing a new pet to take home",
		],
	],
	[
		"at a rural farmhouse with a barn",
		[
			"feeding farm animals",
			"collecting eggs from the chicken coop",
			"milking a cow",
			"riding a tractor",
		],
	],
	[
		"in a contemporary dance studio with a rehearsal",
		["practicing dance moves", "stretching and warming up"],
	],
	[
		"in a home workshop with DIY projects",
		[
			"working on a woodworking project",
			"painting a piece of furniture",
			"organizing tools and supplies",
			"sweeping up sawdust",
		],
	],
	[
		"in an ultra-modern apartment with oversized geometric windows",
		[
			"watering a geometrically arranged succulent garden",
			"practicing yoga, the city lights creating a dynamic backdrop",
			"preparing a meal in the sleek, minimalist kitchen",
			"relaxing on a chaise lounge, gazing at the refracted skyline",
		],
	],
	[
		"in a foggy forest where towering trees merge into abstract lines",
		[
			"walks from the fog, the trees looming",
			"reaching out to touch the soft moss growing on a tree trunk",
			"pausing to listen to the quiet sounds of the forest",
			"observing the intricate patterns of light and shadow on the forest floor",
		],
	],
	[
		"in a desert landscape with massive, abstract dunes sculpted by the wind",
		[
			"climbing a towering sand dune, the sand shifting beneath their feet",
			"shielding their eyes from the sun, gazing at the vast expanse of desert",
			"running down a dune, leaving footprints in the shifting sand",
		],
	],
	[
		"in a minimalist white wall in the centre of the room features wood framed artwork",
		[
			"sitting in the leather chair reading a book",
			"placing a cup of coffee on the black stone coffee table",
			"walks from the room appreciating the minimalist aesthetic",
		],
	],
	[
		"in a muted green room with a textured wallpaper, showcasing a round wooden table",
		[
			"sitting in the vintage armchair reading a book",
			"placing a vase of flowers on the round wooden table",
			"writing in a journal at the table",
			"touching the textured wallpaper",
		],
	],
	[
		"in an elegant cream-colored room featuring a large mirror, a marble side table",
		[
			"placing a decorative object on the marble side table",
			"watering the decorative plant",
			"admiring the elegant decor",
			"arranging flowers in a vase on the side table",
		],
	],
	[
		"in an industrial kitchen with exposed brick walls, showcasing a stainless steel island",
		[
			"preparing a meal at the stainless steel island",
			"sitting on a wooden stool having a cup of coffee",
			"eating a piece of pizza in a big mouthful",
			"placing fresh herbs in pots on the island",
		],
	],
	[
		"in a cozy bedroom with pastel walls, featuring a low platform bed",
		[
			"lying in the low platform bed reading a book",
			"placing a glass of water on the minimalist bedside table",
			"getting out of bed and stretching",
		],
	],
	[
		"in a minimalist classroom with soft blue walls",
		[
			"sitting at a desk writing in a notebook",
			"listening to the teacher lecture",
			"raising their hand to ask a question",
			"writing on the chalkboard",
			"reading a book at their desk",
		],
	],
	[
		"in a dense, fog-covered forest at dusk",
		["carefully stepping over exposed roots", "look up at the sky"],
	],
	[
		"at a cascading waterfall in a lush jungle",
		["gazing up at the cascading water", "wading in the cool pool at the base"],
	],
	[
		"on a frozen tundra with icy winds",
		[
			"pulling their coat tighter against the wind",
			"exhaling a cloud of frosty breath",
			"trudging through the snow",
		],
	],
	[
		"in a dark forest with towering ancient trees",
		["looking up at the towering trees", "stepping over fallen branches"],
	],
	[
		"in a tropical rainforest with misty rain",
		[
			"feeling the mist on their skin",
			"listening to the sounds of the rainforest",
			"walking beneath the dense canopy",
		],
	],
	[
		"in a misty swamp with vines hanging from trees",
		["carefully wading through the murky water", "pushing aside hanging vines"],
	],
	[
		"in a rocky canyon illuminated by the setting sun",
		["watching the colors of the sunset", "standing on the edge of the canyon"],
	],
	[
		"on a starry desert night with distant howling winds",
		["looking up at the stars", "wrapping themselves in a blanket"],
	],
	[
		"at the beachfront sunset in *The Graduate*",
		[
			"standing on the beach",
			"watching the sunset",
			"talking to another character",
		],
	],
	[
		"at the iconic dance scene in *Pulp Fiction*",
		[
			"dancing with a partner",
			"snapping their fingers to the music",
			"drinking a milkshake",
		],
	],
	[
		"at the concert site of a rock band",
		[
			"play the electric guitar passionately",
			"beat the drums passionately",
			"raise the microphone and shout passionately",
		],
	],
	["lying in a bathtub full of bubbles", ["drinking beer", "smoking a cigar"]],
];

const fashionScenes: [string, string[]][] = [
	[
		"on the floor covered with flowers",
		[
			"lying and looking at the viewer with a smile",
			"lying and close the eyes with smile happily",
			"lying and open the hands",
		],
	],
	[
		"in front of a minimalist concrete wall",
		[
			"standing with one leg bent slightly, hand resting on the wall, gazing confidently",
			"leaning against the wall with arms crossed, head tilted back with eyes closed",
			"sitting on the floor with legs extended, one arm draped casually over a knee",
		],
	],
	[
		"in a field of tall, windswept grass",
		[
			"standing tall, one hand raised above the head as the wind blows through the hair",
			"walking slowly, arms outstretched, fingertips brushing against the grass",
			"kneeling in the grass, head tilted to the side, eyes focused intensely ahead",
		],
	],
	[
		"on a staircase",
		[
			"sitting on the stairs, legs crossed, leaning forward slightly with a serious expression",
			"standing on the top step, one foot forward, gazing down with a bold stare",
			"halfway up the stairs, leaning on the railing, one arm draped casually over the side",
		],
	],
	[
		"in a room with large, floor-to-ceiling windows",
		[
			"standing close to the window, arms crossed, looking out with a reflective expression",
			"sitting on the windowsill, one leg bent up, looking down with a soft smile",
			"leaning against the window, one hand pressed against the glass, gazing outward",
		],
	],
	[
		"at a large, ornate doorway",
		[
			"standing in front of the doorway, hands resting lightly on the frame, looking ahead",
			"leaning against one side of the doorway, arms crossed, face turned slightly away",
			"sitting on the steps in front of the doorway, arms resting on knees, look at the viewer",
		],
	],
	[
		"on a rooftop at sunset",
		[
			"standing near the edge, arms outstretched as if embracing the sky",
			"sitting cross-legged, facing the horizon, hands resting casually on knees",
			"standing with one foot on a ledge, leaning slightly forward with a focused gaze",
		],
	],
	[
		"at the entrance of a tunnel with shadows stretching inside",
		[
			"standing just inside the tunnel, one hand on the wall, looking out into the light",
			"walking from the tunnel, arms relaxed at the sides",
			"leaning against the side of the tunnel entrance, head tilted back, eyes closed",
		],
	],
	[
		"in a minimalist room with a single window casting soft light",
		[
			"sitting cross-legged on the floor, bathed in the light from the window",
			"standing in front of the window, one hand raised to touch the glass",
			"leaning against the window frame, looking down thoughtfully",
		],
	],
	[
		"in a narrow alley with high walls",
		[
			"walking confidently down the alley, one hand grazing the wall",
			"standing near the wall, arms crossed, with a soft gaze toward the viewer",
			"leaning against the wall, hands in pockets, with a relaxed posture",
		],
	],
	[
		"on a platform surrounded by geometric shapes",
		[
			"standing on the platform, arms by the sides, looking up at the shapes",
			"sitting at the edge of the platform, legs hanging over, staring off into the distance",
			"leaning on one of the shapes, with one leg bent slightly, gazing forward",
		],
	],
	[
		"in an underground parking garage with harsh lighting",
		[
			"standing in the middle of an empty space, arms crossed, looking intensely ahead",
			"sitting on the hood of a sleek car, leaning slightly forward, a small smirk on the face",
			"walking between the rows of cars, one hand in a pocket, eyes focused straight ahead",
		],
	],
	[
		"in a brightly lit, open atrium with geometric designs",
		[
			"standing in the middle of the space, arms stretched wide, gazing up at the ceiling",
			"leaning against a pillar, one leg bent at the knee, looking casually to the side",
			"sitting on a minimalist bench, arms resting on the backrest, gazing forward",
		],
	],
	[
		"in a clean, white corridor with large glass panels",
		[
			"walking confidently through the corridor, head held high, looking forward",
			"standing near the glass panels, one hand resting on the glass, gazing outside",
			"leaning casually against the wall, arms crossed, with a relaxed posture",
		],
	],
	[
		"in front of a dark backdrop with a single spotlight casting sharp shadows",
		[
			"half-turned to the light, one hand gently touching the chin, eyes gazing into the distance",
			"facing the viewer directly, one hand partially covering the face, fingers spread delicately",
			"tilting the head slightly, one hand resting on the collarbone, soft light highlighting the face, close-up shot",
		],
	],
	[
		"in front of a soft gradient background with dramatic side lighting",
		[
			"with one hand gently brushing the hair back, light catching the edge of the face, medium close-up shot",
			"facing forward, hands framing the face, fingers spread delicately across the cheeks",
			"head tilted downward, hand resting on the forehead, shadows creating depth across the features",
		],
	],
	[
		"against a textured wall with a single beam of light cutting across",
		[
			"turning toward the light, hand raised to shield the eyes, with a soft, contemplative expression",
			"facing the viewer, one hand lightly touching the lips, shadows creating sharp contrast on the face",
			"gazing off to the side, fingers lightly resting on the neck, the light catching the curve of the jawline",
		],
	],
	[
		"in front of a backdrop with geometric light patterns",
		[
			"face partially illuminated by angular light, one hand touching the cheek, gaze focused forward",
			"head turned toward the light, one hand lightly tracing the jawline, shadows accentuating the features",
			"leaning slightly forward, hands intertwined under the chin, with a subtle smile",
		],
	],
	[
		"against a moody backdrop with a soft spotlight creating dramatic shadows",
		[
			"looking directly at the viewer, one hand gently cradling the face, eyes intense and focused",
			"head tilted slightly downward, hand raised to touch the temple, shadows playing across the face, close-up shot",
			"half-turned to the side, hand resting on the shoulder, light highlighting the cheekbones and hands",
		],
	],
	[
		"in the front of a fashionable Morandi style color-blocking background",
		commonFashionActions,
	],
	[
		"in the front of a fashionable Morandi style solid color background",
		commonFashionActions,
	],
	[
		"in the front of a fashionable minimalist, youthful and energetic color matching background",
		commonFashionActions,
	],
	[
		"in the front of a white columns, with long shadows background",
		commonFashionActions,
	],
	[
		"in the front of a black and white stitching background",
		commonFashionActions,
	],
	[
		"in the front of a black and white light and shadow background",
		commonFashionActions,
	],
	[
		"in the front of a minimalist landscape of black and white color block background",
		commonFashionActions,
	],
	[
		"in the front of a abstract composition of overlapping translucent circles in pastel hues background",
		commonFashionActions,
	],
	[
		"in the front of a futuristic grid of perfect cubes and spheres background",
		commonFashionActions,
	],
];

const fantasticScenes: [string, string[]][] = [
	[
		"inside a giant music box, surrounded by intricate gears and melodies",
		[
			"reaching out to touch a spinning gear, watching the music change",
			"dancing to the tinkling melody, twirling among the moving parts",
			"sitting on a tiny bench, listening to the enchanting music",
		],
	],
	[
		"in a room filled with giant balloons of different shapes and sizes",
		[
			"bouncing off a giant balloon, feeling the soft, rubbery surface",
			"floating through the room, holding onto a cluster of balloons",
			"popping a balloon and watching the confetti rain down",
		],
	],
	[
		"on a giant, spinning record player",
		[
			"carefully walking across the spinning record, trying not to fall off",
			"dancing to the music, feeling the vibrations through their feet",
			"sitting on the needle, enjoying the ride as the music plays",
		],
	],
	[
		"in a world made entirely of paper",
		[
			"folding themselves into a paper airplane and gliding through the air",
			"writing a message on a giant piece of paper, using a giant pen",
			"creating origami animals and watching them come to life",
		],
	],
	[
		"on a giant dandelion seed head, floating on the breeze",
		[
			"making a wish and blowing on the seeds, watching them scatter in the wind",
			"lying on the fluffy seed head, feeling the gentle breeze",
			"holding onto the seed head as it floats across the sky, enjoying the journey",
		],
	],
	[
		"on a cloud, drifting lazily across a vibrant sunset sky",
		[
			"lying on their back, gazing up at the swirling colors",
			"reaching out to touch the fluffy clouds surrounding them",
			"sitting cross-legged, meditating peacefully as the sun dips below the horizon",
		],
	],
	[
		"in a field of fireflies that illuminate the night",
		[
			"catching a firefly in their hand and watching it glow",
			"walking through the field, surrounded by a swirling dance of light",
			"lying on the ground, gazing up at the twinkling fireflies like stars",
		],
	],
	[
		"in a giant bird's nest high in a tree",
		[
			"looking down at the world below from the edge of the nest",
			"curling up in the soft nest, feeling safe and secure",
			"reaching out to touch the giant eggs nestled beside them",
		],
	],
	[
		"on the surface of a mirror-like ocean reflecting a kaleidoscope sky",
		[
			"walking on the water's surface, the sky reflecting in their footsteps",
			"sitting on the water, legs crossed, the reflection distorting beneath",
			"reaching down to touch the water, causing ripples to turn into colorful patterns",
		],
	],
	[
		"in a glowing cave filled with crystals",
		[
			"running their hand along a crystal surface",
			"admiring the light refracting through the crystals",
			"carefully navigating the uneven cave floor",
		],
	],
	[
		"in an enchanted forest with glowing mushrooms",
		[
			"bending down to examine a glowing mushroom",
			"walks from a path lit by glowing mushrooms",
		],
	],
	[
		"in a dark, abandoned castle",
		[
			"walking down a dusty hallway",
			"pushing open a creaking door",
			"holding a flickering lantern",
		],
	],
	[
		"in an ancient temple hidden deep within a jungle",
		[
			"examining ancient carvings on the walls",
			"brushing dust off a stone statue",
			"walks from crumbling ruins",
		],
	],
	[
		"in a forgotten city overgrown with vines",
		["pushing aside thick vines", "walking through crumbling streets"],
	],
	[
		"in a labyrinth of mirrors reflecting endless possibilities",
		[
			"looking into a mirror at their reflection",
			"trying to find their way through the maze",
			"touching the surface of a mirror",
		],
	],
	[
		"on a ghostly ship",
		[
			"walking across the creaking deck",
			"looking out at the misty sea",
			"holding onto the ship's railing",
		],
	],
	[
		"in an underground cavern lit by glowing fungi",
		[
			"admiring the glowing fungi",
			"carefully navigating the uneven cave floor",
			"touching the soft surface of a glowing mushroom",
		],
	],
	[
		"in a futuristic city with flying cars and neon lights",
		[
			"looking up at the flying cars",
			"walking along a busy street",
			"admiring the bright neon lights",
		],
	],
	[
		"in a high-tech laboratory filled with robotic arms",
		[
			"examining a complex piece of equipment",
			"typing on a futuristic keyboard",
		],
	],
	[
		"on an alien planet with strange plants and floating rocks",
		["looking at the strange plants", "walking on the uneven surface"],
	],
	[
		"in a utopian city with glass towers and holograms",
		[
			"looking up at the glass towers",
			"walks from a pristine park",
			"interacting with a hologram",
		],
	],
	[
		"in a spaceship",
		[
			"looking out the window at the stars",
			"sitting in the pilot's chair",
			"pushing buttons on a control panel",
		],
	],
	[
		"in a post-apocalyptic wasteland with ruined buildings",
		[
			"walking through the rubble",
			"scavenging for supplies",
			"looking at the ruined buildings",
		],
	],
	[
		"in a virtual reality world with pixelated landscapes",
		[
			"interacting with the virtual environment",
			"walks from the pixelated landscape",
			"wearing a VR headset",
		],
	],
	[
		"at a neon-lit nightclub in a futuristic metropolis",
		[
			"dancing to the music",
			"drinking a futuristic cocktail",
			"talking to someone at the bar",
		],
	],
	[
		"in a world where everything is made of candy",
		["taking a bite out of a candy", "walking on a candy path"],
	],
	[
		"in an underwater kingdom with glowing creatures",
		[
			"swimming through the underwater kingdom",
			"looking at the glowing creatures",
			"riding a seahorse",
		],
	],
	[
		"in a land where the sky is filled with floating lanterns",
		[
			"looking up at the floating lanterns",
			"releasing a lantern into the sky",
			"walks from a field of lanterns",
		],
	],
	[
		"in a magical workshop filled with enchanted objects",
		["looking at the enchanted objects", "mixing potions"],
	],
	[
		"at the end of the world in *Mad Max: Fury Road*",
		[
			"driving a vehicle across the wasteland",
			"looking out at the desolate landscape",
			"holding a weapon",
		],
	],
	[
		"in the Hogwarts Great Hall in *Harry Potter* series",
		["sitting at a table in the Great Hall", "talking to another student"],
	],
	[
		"on the space station in *2001: A Space Odyssey*",
		["floating in zero gravity", "operating a control panel"],
	],
	[
		"on the battlefield in *Gladiator*",
		["fighting with a sword", "riding a horse"],
	],
	[
		"at the grand ball scene in *Beauty and the Beast*",
		["dancing with a partner", "walking down a grand staircase"],
	],
	[
		"in a garden with oversized flowers towering overhead",
		[
			"standing beneath a giant flower, reaching up to gently touch its petal",
			"sitting on a large leaf, legs crossed, gazing up at the towering stems",
			"walking along a path of vines, brushing aside oversized leaves",
		],
	],
	[
		"in a maze made of oversized dominoes",
		[
			"standing at the entrance, hands on hips, studying the towering domino walls",
			"pushing one domino, watching the chain reaction as it starts to fall",
			"climbing up the side of a leaning domino, reaching for the top",
		],
	],
	[
		"atop a giant snail shell spiraling into the horizon",
		[
			"sitting near the center of the spiral, looking curiously down into its depths",
			"walking along the spiral edge, arms stretched out for balance",
			"lying flat on the shell, arms spread wide, feeling the texture beneath",
		],
	],
	[
		"in a field of balloons, each tethered to the ground",
		[
			"floating slightly off the ground, holding on to a balloon string with one hand",
			"sitting on a balloon as if it were a chair, legs swinging playfully",
			"reaching out to grab a floating balloon, standing on tiptoe",
		],
	],
	[
		"on a staircase made of giant piano keys",
		[
			"walking up the keys, each step making a sound, arms swinging with each step",
			"sitting on one of the large keys, tapping on another as if playing a tune",
			"jumping from key to key, making playful musical sounds with every landing",
		],
	],
	[
		"inside a giant bottle floating on a sea",
		[
			"sitting cross-legged inside the bottle, looking out through the glass at the ocean",
			"standing at the edge of the bottle opening, arms spread as if about to dive into the water",
			"leaning against the bottle's wall, gazing dreamily out at the waves",
		],
	],
	[
		"on a giant clock face",
		[
			"walking along the clock hand, carefully balancing with arms stretched out",
			"sitting on the edge of the clock face, legs dangling between the numbers",
			"standing near the center, watching the hands pass by with a thoughtful expression",
		],
	],
	[
		"in a boat made of leaves, floating on a calm pond",
		[
			"sitting in the center of the leaf boat, dipping a hand into the water",
			"lying back in the boat, arms crossed behind the head, floating peacefully",
			"standing at the tip of the boat, arms stretched out as if sailing on the breeze",
		],
	],
	[
		"inside a hollowed-out pumpkin, with windows carved in",
		[
			"sitting at one of the windows, looking out thoughtfully at the surroundings",
			"lying inside the pumpkin, arms behind the head, relaxed in the cozy space",
			"standing at the opening of the pumpkin, one hand resting on the carved edge",
		],
	],
	[
		"on a giant pizza slice",
		[
			"sliding down the cheese like a water slide, arms flailing",
			"sitting on the crust, holding a giant pepperoni like a steering wheel",
			"trying to balance on the slippery cheese, arms waving to stay upright",
		],
	],
	[
		"in a bathtub full of popcorn",
		[
			"sitting in the tub, tossing popcorn in the air and catching it with their mouth",
			"lying in the popcorn",
			"trying to paddle through the popcorn like it's water, but getting stuck",
		],
	],
	[
		"on a giant banana peel",
		[
			"slipping and falling dramatically, arms and legs flailing",
			"sitting on the peel, sliding downhill like a sled, laughing",
			"trying to stand on the slippery surface, wobbling comically",
		],
	],
	[
		"inside a giant sandwich",
		[
			"peeking out between two slices of bread, looking surprised",
			"sitting in the sandwich, holding a tomato slice like an umbrella",
			"trying to push up the top slice of bread like it's too heavy",
		],
	],
	[
		"on a giant stack of pancakes",
		[
			"sliding down the syrupy surface, laughing as they go",
			"sitting on top, holding a fork bigger than them, ready to dig in",
			"stuck in the syrup, trying to pull their feet free with exaggerated effort",
		],
	],
	[
		"in a field of rubber ducks",
		[
			"standing among the ducks, holding a giant rubber duck and looking confused",
			"sitting on a giant duck, paddling through the field like it's water",
			"pretending to give a serious speech to the rubber ducks, arms raised dramatically",
		],
	],
	[
		"inside a giant bowl of spaghetti",
		[
			"swinging on a giant spaghetti strand like a vine, Tarzan-style",
			"sitting in the bowl, twirling a forkful of giant noodles",
			"getting tangled in the noodles, trying to escape but only getting more wrapped up",
		],
	],
	[
		"on a giant seesaw made of breadsticks",
		[
			"teetering back and forth, holding onto the breadsticks for dear life",
			"sitting on one end, launching a friend into the air as they jump",
			"balancing in the middle, arms out like a tightrope walker",
		],
	],
	[
		"in a massive bowl of jelly",
		[
			"bouncing up and down like a trampoline, arms flapping for balance",
			"sinking slowly into the jelly, looking panicked but amused",
			"lying on top of the jelly, bouncing slightly with every movement",
		],
	],
	[
		"on a giant stack of books, teetering precariously",
		[
			"trying to balance while standing on the top book, arms waving",
			"sitting cross-legged on the top book, reading another, completely calm",
			"sliding down the side of the stack like a makeshift slide, laughing",
		],
	],
	[
		"in a swimming pool full of jelly beans",
		[
			"swimming through the jelly beans, throwing them in the air joyfully",
			"sitting in an inner tube, slowly sinking into the jelly beans",
			"diving into the jelly beans, disappearing beneath the surface",
		],
	],
	[
		"on a giant chessboard",
		[
			"riding a knight like a horse, pretending to charge into battle",
			"hiding behind a rook, peeking out cautiously",
			"standing on top of a queen piece, striking a victory pose",
		],
	],
	[
		"in a room filled with oversized feathers",
		[
			"trying to walk through the room, getting tickled with every step",
			"lying in the feathers, laughing uncontrollably as they get tickled",
			"trying to blow the feathers away, but they keep floating back",
		],
	],
	[
		"on a giant cookie",
		[
			"sitting at the edge of the cookie, dunking it into a giant cup of milk",
			"lying on the cookie, pretending to take a nap on the chocolate chips",
			"holding a giant glass of milk, ready to dip the cookie",
		],
	],
	[
		"on a stack of giant waffles",
		[
			"sliding down the waffle stack like a playground slide, grinning",
			"trying to pull their foot out of sticky syrup, looking frustrated",
		],
	],
	[
		"inside a giant cereal bowl",
		[
			"floating on a piece of cereal like it's a raft, looking around",
			"splashing around in the milk, having a great time",
			"trying to swim through the milk, pushing pieces of cereal aside",
		],
	],
	[
		"in a field of giant mushrooms",
		[
			"sitting on top of a mushroom, feet dangling, looking relaxed",
			"jumping from mushroom to mushroom like stepping stones",
			"using a giant mushroom cap as an umbrella in an imaginary rainstorm",
		],
	],
	[
		"on a beach with giant ice cream cones",
		[
			"trying to lick a giant ice cream",
			"catching the melting ice cream with their hands, looking panicked",
		],
	],
	[
		"on a giant soccer ball rolling down a hill",
		[
			"running on top of the ball like a circus act, arms flailing",
			"sitting on the ball, rolling uncontrollably down the hill, laughing",
			"hanging onto the ball for dear life, feet dragging along the ground",
		],
	],
	[
		"lying in a bathtub full of colorful bubbles",
		[
			"drinking a big bucket of milk",
			"cover chest with hands and laugh at the viewer",
		],
	],
];

function getRandom(array: string[] | [string, string[]][]) {
	const randomIndex = Math.floor((Math.random() * Date.now()) % array.length);
	return array[randomIndex];
}

const newStyle: string[] = [];
function styleFilter() {
	for (let x = 0; x < style.length; x++) {
		newStyle.push(style[x]);
	}
}

const newScene: [string, string[]][] = [];

function sceneFilter() {
	newScene.push(...dailyScenes, ...fashionScenes, ...fantasticScenes);
}

function generatePrompt() {
	const randomStyle = getRandom([...newStyle, ...customStyle]);
	const randomLight = getRandom(light);

	let randomSubject: string = "",
		randomClothes: string = "",
		randomAction: string[] | string = [""],
		randomScene: string = "";

	const rand = Math.random();

	const sceneArray = getRandom(newScene) as [string, string[]];
	randomScene = sceneArray[0];
	randomAction = getRandom(sceneArray[1]) as string[];
	if (Math.random() < 0.15) {
		if (dailyScenes.includes(sceneArray)) {
			randomAction = getRandom(commonDailyActions) as string;
		} else if (fashionScenes.includes(sceneArray)) {
			randomAction = getRandom(commonFashionActions) as string;
		} else if (fantasticScenes.includes(sceneArray)) {
			randomAction = getRandom(commonFantasticActions) as string;
		}
	}

	if (rand < 0.1) {
		randomSubject = getRandom(animal) as string;

		if (dailyScenes.includes(sceneArray)) {
			randomClothes = "";
			randomAction = "";
		} else if (fashionScenes.includes(sceneArray)) {
			randomClothes = "";
			randomAction = "";
		} else if (fantasticScenes.includes(sceneArray)) {
			randomClothes =
				Math.random() < 0.5
					? (getRandom(maleFantasticClothes) as string)
					: (getRandom(femaleFantasticClothes) as string);
		}
	} else if (rand < 0.5) {
		randomSubject = getRandom(allPeople) as string;

		if (dailyScenes.includes(sceneArray)) {
			randomClothes = getRandom(maleDailyClothes) as string;
		} else if (fashionScenes.includes(sceneArray)) {
			randomClothes = getRandom(maleFashionClothes) as string;
		} else if (fantasticScenes.includes(sceneArray)) {
			randomClothes = getRandom(maleFantasticClothes) as string;
		}

		if (Math.random() < 0.3) {
			const name = getRandom(maleName);
			randomSubject += ' named "' + name + '"';
		}
	} else if (rand < 0.9) {
		randomSubject = getRandom(allPeople) as string;

		if (dailyScenes.includes(sceneArray)) {
			randomClothes = getRandom(femaleDailyClothes) as string;
		} else if (fashionScenes.includes(sceneArray)) {
			randomClothes = getRandom(femaleFashionClothes) as string;
		} else if (fantasticScenes.includes(sceneArray)) {
			randomClothes = getRandom(femaleFantasticClothes) as string;
		}

		randomClothes = getRandom(femaleDailyClothes) as string;

		if (Math.random() < 0.3) {
			const name = getRandom(femaleName);
			randomSubject += ' named "' + name + '"';
		}
	} else if (rand < 0.95) {
		randomSubject = getRandom(specialCharacters) as string;
		randomClothes = "";
	} else {
		if (Math.random() < 0.5) {
			randomSubject =
				getRandom(allPeople) + " with " + getRandom(allPeople) + " together";
			randomClothes = "";
		} else {
			randomSubject = getRandom(groupPerson) as string;
			randomClothes = "";
		}
	}

	const buildPrompt = `${randomStyle}, ${randomLight}. ${randomSubject} and ${randomClothes}, ${randomAction} ${randomScene}.`;

	return buildPrompt
		.replace(", , .", ".")
		.replace(", ,", ",")
		.replace(". ,", ".")
		.replace(",  .", ".");
}

styleFilter();
sceneFilter();
const prompt = generatePrompt();
console.log(prompt);
