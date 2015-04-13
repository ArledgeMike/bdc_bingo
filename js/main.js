/*
var square =[
"Living Legend",
"crying",
"Movie Hero",
"blessed",
"newcomer",
"awkward pause",
"Billy Crystal",
"Kanye Joke",
"Bad Joke",		
"ground-breaking",
"Paul McCartney",
"red carpet hyperbole",
"speechless",
"Selfie",
"the fans",
"honor to be nominated",
"Controversy",
"first time winner",
"played off",
"confused guy",
"never heard of you",
"thought you were dead",
"thought you were in rehab",
"couldn't be there to accept",
"on the news tomorrow",
"mismatched presenters",
"the whole showgot back together",
"didn't know they were dead",
"had to be censored",
"Frozen Song",
"Why are you there?",
"tripped on the stage",
"violence",
"overqualified spouse",
"Shia Lebouf Antics",
"James Franco Antics",
"Indepent Film Win",
"Upset",
"sexism",
"ageism",
"out of touch interviewer",
"NPH Magic Trick",
"Musical Number",
"Actor singing",
"Gwyneth Paltrow Anything",
"Edward Norton Snobbery",
"I don't know who I am wearing",
"Jake Gylenhall snub",
"American Sniper Win",
"Awkward pre-taped sketch",
"swag bag",
"Shes too young for that",
"Where was that movie?",
"Crazy Rich Old White Guy",	
"Akward performance",
"Jennifer Lawrence Goof",
];
*/
var got_squares = [
	"The Wall",
	"John Snow Smolder",
	"I Can't Believe they killed them!",
	"The Iron Throne",
	"White Walkers",
	"Sword Fight",
	"Sex Scene",
	"Boobs",
	"Winter Is Coming",
	"winterfell",
	"Decapitation",
	"Crows",
	"White Horse",
	"A Warg Vision",
	"Arya Lists Another Person She Wants Dead",
	"Torture Scene", "Dragons Escape",
	"Daenerys Saves Someone",
	"Something In The Show Pisses You Off",
	"King Slayer",
	"Cercei Being Evil",
	"Tyrlon Being A Ladies Man",
	"Incest",
	"Mother of Dragons",
	"King Of The North",
	"Someone Is Reunited",
	"Margaery Makes A Power Move",
	"Sansa Gets Screwed Over",
	"LittleFinger Being Sneaky",
	"Dragons Kill someone",
	"The Nights Watch",
	"A Threesome",
	"A Long Journey",
	"Ayra Wears A Dress",
	"Tryion Escapes Death",
	"Dire Wolfe Kills Someone",
	"Missed Connection",
	"NEW CHARACTER!!!!",
	"Margaery and cersei go at it",
	"Faceless Men",
	"Another Wedding",
	"Unwanted Wedding",
	"Cersei Is A Bitch",
	"The Hound Is A Dick",
	"Cute Cat",
	"Love Triangle",
	"What The Fuck Moment",
	"The Wall Is Attacked",
	"Crazy",
	"Dragons Found By The Enemy",
	"Daenerys Is A Boss Bitch",
	"Flash Back Moment",
	"Joffrey's Murder Mentioned",
	"Reek Snaps Out Of It",
	"Reek Kills His Family Member",
	"Reek Is Framed",
	"Reek Escapes",
	"Reek Kills Capture",
	"Ramsey Dies",
	"Danearys Captures New City",
	"Danearys Meets Everyone Else",
	"Sansa Is Used",
	"New King Is Killed",
	"Tyrion escapes",
	"Jorah Mormont Comes Back",
	"Tommen Baratheon Is Brainwashed",
	"Tommen Baratheon Does Something Evil",
	"Tommen Baratheon Will Be A Good King"
];


function Bingo_Board(text_array) {
	this.square_text = text_array,
	this.cm = new Cookie_Monster(),
	this.already_played = this.cm.get_cookie("bingo"),
	this.demo_mode = false,
	this.tiles = [],
	this.marked_tiles = [],
	this.winning_moves = [
		[1, 5, 21, 25],
		[1, 7, 13, 19, 25],
		[5, 9, 13, 17, 21],
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 10],
		[11, 12, 13, 14, 15],
		[16, 17, 18, 19, 20],
		[21, 22, 23, 24, 25],
		[1, 6, 11, 16, 21],
		[2, 7, 12, 17, 22],
		[3, 8, 13, 18, 23],
		[4, 9, 14, 19, 24],
		[5, 10, 15, 20, 25]
	],
	this.$demo_btn = $('#demo_show'),
	this.$new_board = $('#reset_board');
	this.init();
}

Bingo_Board.prototype = {
	constructor: Bingo_Board,

	init: function() {
		var t = this;
		t.$demo_btn.on("click", function() {
			t.show_winning_moves();
		});
		t.$new_board.on("click", function() {
			t.cm.delete_cookies();
			location.reload();
		});

		if (this.already_played === undefined) {
			this.build_new_board();
		} else {
			this.rebuild_board();
		}
	},

	build_new_board: function() {
		var t = this;
		var boxes = [];
		for (var i = 0; i < 25; i++) {
			var to_delete = Math.floor(Math.random() * t.square_text.length);
			boxes.push(t.square_text[to_delete]);
			if (i == 12) {
				var tile = new Bingo_Tile("FREE SPACE", "#box", i + 1, this);
				$('li')[14].click();
				tile.$spot.off("click");
			} else {
				var tile = new Bingo_Tile(t.square_text[to_delete], "#box", i + 1, this);
			}
			t.tiles.push(tile);
			t.square_text.splice(to_delete, 1);
		}
		if (this.already_played === undefined) {
			this.cm.set_cookie("bingo", boxes);
		}
	},

	rebuild_board: function() {
		var t = this;
		var arr = t.already_played.bingo.split(",");
		for (var i = 0; i < 25; i++) {
			var text_num = arr[i];

			if (i == 12) {

				var tile = new Bingo_Tile("FREE SPACE", "#box", i + 1, this);
				$('li')[14].click();
				tile.$spot.off("click");
			} else {
				var tile = new Bingo_Tile(text_num, "#box", i + 1, this);
			}
			this.tiles.push(tile);
		}
	},

	check_for_win: function() {
		var t = this;
		for (var i = 0; i < this.winning_moves.length; i++) {
			var matches = [],
				sorted_tiles = this.marked_tiles.sort(function(a, b) {
					return a - b;
				});
			sorted_tiles.filter(function(n, index) {
				if (t.winning_moves[i].indexOf(n) != -1) {
					matches.push(sorted_tiles[index]);
					if (matches.length === t.winning_moves[i].length && !(t.demo_mode)) {
						t.show_win();
						return;
					}
				}
			});
		}
	},
	show_win: function() {
		var t = this;
		$('#modal_background').fadeIn(function() {

			$('#modal_window').animate({
				top: "10%"
			}, 800, function() {
				$('#win_btn').on("click", function() {

					t.cm.delete_cookies();
					location.reload();
				});

			});

		});



	},

	get_tile: function(id) {
		for (var x = 0; x < this.tiles.length; x++) {
			if (this.tiles[x].id === id) {
				return this.tiles[x];
			} else {

			}
		}
	},

	show_winning_moves: function() {
		this.demo_mode = true;
		var index = 0,
			tg = this,
			m = window.setInterval(function() {
				var arr = tg.winning_moves[index];
				arr.forEach(function(value, it) {
					var tile = tg.get_tile(value),
						dex = tile.id - 1;
					tile.$spot.click();
					if (it == arr.length - 1) {
						window.setTimeout(function() {
							$('li.active').click();
						}, 1400);
					}
				});
				index++;
				if (index === tg.winning_moves.length) {
					tg.demo_mode = false;
					window.clearInterval(m);
				}
			}, 1500);
	},

	add_marked_box: function(index_num) {
		this.marked_tiles.push(index_num);
		return this.marked_tiles;
	},

	remove_marked_box: function(index_num) {
		var index = this.marked_tiles.indexOf(index_num);
		this.marked_tiles.splice(index, 1);
		return this.marked_tiles;
	}

};


function Bingo_Tile(spot_text, parent_el, id, board_ref) {
	this.$spot = $('<li/>'),
	this.$ink = $('<span class="ink"/>'),
	this.$text = $('<p/>'),
	this.spot_text = spot_text,
	this.$checkmark = $('<span class="checkmark"/>'),
	this.id = id,
	this.board = board_ref,
	this.parent = $(parent_el),
	this.marked_box = false;
	this.$spot.on("click", this.toggle_tile.bind(this));
	this.init();
}


Bingo_Tile.prototype = {

	constructor: Bingo_Tile,

	init: function() {
		this.$text.text(this.spot_text).appendTo(this.$spot);
		this.$ink.appendTo(this.$spot);
		this.$checkmark.appendTo(this.$spot);
		this.$spot.appendTo(this.parent);
		this.$text.delay(this.id * 50).animate({
			opacity: 1
		});
	},

	toggle_tile: function() {
		if (this.marked_box) {
			this.board.remove_marked_box(this.id);
			this.$spot.removeClass("active");
			this.marked_box = false;
		} else {
			this.board.add_marked_box(this.id);
			this.$spot.addClass("active");
			this.marked_box = true;
			this.board.check_for_win();
		}
		this.ripple_effect(event);
	},

	ripple_effect: function() {
		var ink = this.$ink;
		if (event === undefined) {
			ink.addClass("ripple-effect");
		} else {
			ink.css("top", event.offsetY).css("left", event.offsetX).addClass("ripple-effect");
		}
		window.setTimeout(function() {
			ink.removeClass("ripple-effect");
		}, 600);
	}
};


var board = new Bingo_Board(got_squares);
var margin_left;
var anim = {
	"left": "50%",
	"marginLeft": margin_left
};
$('#main_menu').fadeIn(600, function() {
	$('#box').animate({
		left: "50%"

	}, 850, function() {

	});




});
