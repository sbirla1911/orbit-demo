// Orbit demo: flow, fake matching, and animations.

var state = {
  name: "Alex", age: 19, interests: [], budget: 25, scope: "campus", synced: false,
  candidates: [], plans: [], booked: []
};

var $ = function (id) { return document.getElementById(id); };
var byId = {};
INTERESTS.forEach(function (i) { byId[i.id] = i; });

function initials(name) { return name.split(" ").map(function (w) { return w[0]; }).join(""); }
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
function shared(a, b) { return a.filter(function (x) { return b.indexOf(x) > -1; }); }
function money(n) { return n === 0 ? "Free" : "$" + n + " each"; }

// ---------- Screen navigation ----------
var SCREENS = ["s-you", "s-match", "s-plans", "s-semester"];
function show(idx) {
  SCREENS.forEach(function (id, i) { $(id).classList.toggle("active", i === idx); });
  Array.prototype.forEach.call($("steps").children, function (li, i) {
    li.className = i === idx ? "active" : i < idx ? "done" : "";
  });
  window.scrollTo(0, 0);
}

// ---------- Screen 1: About you ----------
INTERESTS.forEach(function (it) {
  var b = document.createElement("button");
  b.className = "chip";
  b.textContent = it.emoji + " " + it.label;
  b.onclick = function () {
    var i = state.interests.indexOf(it.id);
    if (i > -1) state.interests.splice(i, 1); else state.interests.push(it.id);
    b.classList.toggle("on", i === -1);
    var n = state.interests.length;
    $("pick-count").textContent = n === 0 ? "pick 3+" : n + " picked";
  };
  $("chips").appendChild(b);
});

$("in-budget").oninput = function () {
  state.budget = +this.value;
  $("budget-out").textContent = state.budget === 0 ? "Free only" : "$" + state.budget;
};

Array.prototype.forEach.call($("scope").children, function (b) {
  b.onclick = function () {
    Array.prototype.forEach.call($("scope").children, function (x) { x.classList.remove("on"); });
    b.classList.add("on");
    state.scope = b.dataset.v;
  };
});

function syncCalendar() {
  if (state.synced) return Promise.resolve();
  state.synced = true;
  var btn = $("sync");
  btn.textContent = "Syncing…";
  return wait(700).then(function () {
    btn.textContent = "✓ Calendar synced";
    btn.classList.add("synced");
    $("free").innerHTML = MY_FREE.map(function (s, i) {
      return '<span style="animation-delay:' + i * 0.12 + 's">' + s + "</span>";
    }).join("");
  });
}
$("sync").onclick = syncCalendar;

$("go").onclick = function () {
  if (state.interests.length === 0) {
    $("chips").animate([{ transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "none" }], { duration: 300, iterations: 2 });
    return;
  }
  state.name = ($("in-name").value.trim() || "Alex");
  state.age = +$("in-age").value || 19;
  syncCalendar().then(runMatching);
};

// ---------- Matching logic ----------
function scoreStudent(s) {
  var common = shared(state.interests, s.interests).length;
  var ageGap = Math.abs(s.age - state.age);
  var budgetFit = s.budget >= Math.min(state.budget, 20) ? 6 : 0;
  var slots = shared(MY_FREE, s.free).length;
  var score = 58 + common * 13 - ageGap * 2 + budgetFit + slots * 3;
  return Math.max(61, Math.min(98, score));
}

function findCandidates() {
  var allowed = CAMPUSES[state.scope];
  return STUDENTS
    .filter(function (s) { return allowed.indexOf(s.campus) > -1; })
    .map(function (s) { return Object.assign({}, s, { score: scoreStudent(s), common: shared(state.interests, s.interests) }); })
    .filter(function (s) { return s.common.length > 0 || s.score > 75; })
    .sort(function (a, b) { return b.score - a.score; });
}

function buildPlans(cands) {
  // Try the user's interests first, then popular interests among their matches.
  var order = state.interests.slice();
  INTERESTS.forEach(function (i) { if (order.indexOf(i.id) === -1) order.push(i.id); });

  var plans = [], used = {};
  for (var k = 0; k < order.length && plans.length < 3; k++) {
    var interest = order[k], act = ACTIVITIES[interest];
    if (act.price > state.budget) continue;
    var pool = cands.filter(function (c) { return c.interests.indexOf(interest) > -1 && !used[c.name]; });
    if (!pool.length) continue;
    var first = pool[0];
    var slots = shared(MY_FREE, first.free);
    var second = pool.slice(1).find(function (c) { return shared(slots, c.free).length > 0; });
    var group = second ? [first, second] : [first];
    var slot = shared(slots, second ? second.free : first.free)[0] || slots[0];
    group.forEach(function (p) { used[p.name] = true; });
    var avg = Math.round(group.reduce(function (t, p) { return t + p.score; }, 0) / group.length);
    plans.push({ interest: interest, act: act, group: group, slot: slot, score: avg, isNew: state.interests.indexOf(interest) === -1 });
  }
  return plans;
}

// ---------- Screen 2: AI at work ----------
function placeDots(cands) {
  var orbit = $("orbit");
  orbit.querySelectorAll(".dot").forEach(function (d) { d.remove(); });
  $("me-bubble").textContent = state.name[0].toUpperCase();
  var people = STUDENTS.concat(STUDENTS.slice(0, 14).map(function (s) { return { name: "· ·", color: "#C9C5D6", ghost: true }; }));
  return people.map(function (p, i) {
    var a = (i / people.length) * Math.PI * 2 + Math.random() * 0.3;
    var r = 170 + Math.random() * 80;
    var d = document.createElement("div");
    d.className = "dot";
    d.style.background = p.color;
    d.style.left = 260 + Math.cos(a) * r + "px";
    d.style.top = 260 + Math.sin(a) * r + "px";
    d.textContent = p.ghost ? "" : initials(p.name);
    d.dataset.name = p.name;
    orbit.appendChild(d);
    return d;
  });
}

function logLine(html, icon) {
  var li = document.createElement("li");
  li.className = "doing";
  li.innerHTML = '<span class="ic"></span><span>' + html + "</span>";
  $("log").appendChild(li);
  return function finish() { li.className = "done"; li.querySelector(".ic").textContent = icon || "✓"; };
}

function runMatching() {
  show(1);
  $("log").innerHTML = "";
  var cands = findCandidates();
  var plans = buildPlans(cands);
  state.candidates = cands; state.plans = plans; state.booked = [];
  var dots = placeDots(cands);
  var candNames = cands.map(function (c) { return c.name; });
  var picked = [];
  plans.forEach(function (p) { p.group.forEach(function (g) { picked.push(g.name); }); });
  var where = { campus: "Penn", inter: "Penn, Drexel & Temple", city: "all of Philly" }[state.scope];
  var emojis = state.interests.map(function (i) { return byId[i].emoji; }).join(" ");

  var done;
  done = logLine("Scanning <b>" + POOL_SIZE[state.scope].toLocaleString() + "</b> students at " + where);
  wait(1000).then(function () {
    done();
    dots.forEach(function (d) { if (candNames.indexOf(d.dataset.name) === -1) d.classList.add("fade"); });
    done = logLine("Matching your interests " + emojis);
    return wait(1000);
  }).then(function () {
    done();
    done = logLine("Comparing calendars → <b>" + MY_FREE.length + " open slots</b>");
    return wait(1000);
  }).then(function () {
    done();
    done = logLine("Keeping it under <b>" + (state.budget ? "$" + state.budget : "$0") + "</b> per person");
    return wait(900);
  }).then(function () {
    done();
    var n = 0;
    dots.forEach(function (d) {
      if (picked.indexOf(d.dataset.name) > -1) {
        var a = (n++ / picked.length) * Math.PI * 2 - Math.PI / 2;
        d.classList.add("pick");
        d.style.left = 260 + Math.cos(a) * 125 + "px";
        d.style.top = 260 + Math.sin(a) * 125 + "px";
      } else if (!d.classList.contains("fade")) d.classList.add("fade");
    });
    done = logLine("Holding spots at <b>" + plans.length + " venues</b>");
    return wait(1100);
  }).then(function () {
    done();
    var li = document.createElement("li");
    li.className = "final";
    li.innerHTML = '<span class="ic">✦</span><span>' + picked.length + " people · " + plans.length + " plans ready</span>";
    $("log").appendChild(li);
    return wait(1300);
  }).then(renderPlans);
}

// ---------- Screen 3: Plans ----------
function personRow(p) {
  var tags = p.common.map(function (i) { return byId[i].emoji; }).join(" ");
  return '<div class="person" data-name="' + p.name + '">' +
    '<div class="av" style="background:' + p.color + '">' + initials(p.name) + "</div>" +
    '<div><div class="p-name">' + p.name.split(" ")[0] + ", " + p.age + " " + tags + "</div>" +
    '<div class="p-sub">' + p.major + " · " + p.campus + "</div></div>" +
    '<span class="p-status"></span></div>';
}

function renderPlans() {
  show(2);
  $("plans-name").textContent = state.name;
  $("to-semester").classList.add("hidden");
  if (!state.plans.length) {
    $("cards").innerHTML = '<div class="waiting">No one matches yet. Try "Whole city" or a higher budget.</div>';
    return;
  }
  $("cards").innerHTML = state.plans.map(function (p, i) {
    return '<div class="card" id="card-' + i + '">' +
      '<div class="card-top"><div class="act-emoji">' + byId[p.interest].emoji + '</div><div class="score">' + p.score + "% match</div></div>" +
      '<div><div class="act-title">' + p.act.title + '</div><div class="act-venue">📍 ' + p.act.venue + (p.isNew ? " · try something new" : "") + "</div></div>" +
      '<div class="meta"><span>🗓 ' + p.slot + "</span><span>💵 " + money(p.act.price) + "</span><span>👥 " + (p.group.length + 1) + "</span></div>" +
      '<div class="people">' + p.group.map(personRow).join("") + "</div>" +
      '<div class="card-actions"><button class="btn ghost" data-pass="' + i + '">Pass</button><button class="btn primary" data-join="' + i + '">I\'m in</button></div>' +
      "</div>";
  }).join("");

  $("cards").querySelectorAll("[data-pass]").forEach(function (b) {
    b.onclick = function () { $("card-" + b.dataset.pass).classList.add("passed"); };
  });
  $("cards").querySelectorAll("[data-join]").forEach(function (b) {
    b.onclick = function () { join(+b.dataset.join); };
  });
}

function join(i) {
  var p = state.plans[i], card = $("card-" + i);
  var actions = card.querySelector(".card-actions");
  actions.outerHTML = '<div class="waiting">Sending invites…</div>';
  var rows = card.querySelectorAll(".person");
  rows.forEach(function (r) { r.querySelector(".p-status").textContent = "⏳"; });

  var chain = wait(500);
  rows.forEach(function (r) {
    chain = chain.then(function () { r.querySelector(".p-status").textContent = "✅"; return wait(650); });
  });
  chain.then(function () {
    card.querySelector(".waiting").outerHTML =
      '<div class="booked-box">✓ Booked · ' + p.slot +
      "<small>" + (p.act.price ? "$" + p.act.price + " paid with Orbit Pay · " : "") + "added to everyone's calendar</small></div>";
    card.classList.add("booked");
    p.group.forEach(function (g) { if (state.booked.indexOf(g) === -1) state.booked.push(g); });
    confetti();
    $("to-semester").classList.remove("hidden");
  });
}

function confetti() {
  var box = $("confetti"), colors = ["#6D4AFF", "#A895FF", "#D9D0FF", "#15131F"];
  for (var i = 0; i < 70; i++) {
    var c = document.createElement("i");
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = Math.random() * 0.4 + "s";
    c.style.animationDuration = 1.4 + Math.random() * 1 + "s";
    box.appendChild(c);
  }
  setTimeout(function () { box.innerHTML = ""; }, 2800);
}

// ---------- Screen 4: Semester ----------
$("to-semester").onclick = function () { show(3); renderSemester(); };

function friendList() {
  var list = state.booked.slice();
  state.candidates.forEach(function (c) {
    if (!list.some(function (x) { return x.name === c.name; })) list.push(c);
  });
  return list;
}

function renderSemester() {
  var freq = +$("in-freq").value;
  var all = friendList();
  var count = Math.min(all.length, Math.max(state.booked.length, Math.round(1 + freq * 0.9)));
  $("freq-out").textContent = freq;
  $("meetups-num").textContent = freq * 4;
  var num = $("friends-num");
  num.textContent = count;
  num.classList.add("bump");
  setTimeout(function () { num.classList.remove("bump"); }, 200);

  var days = ["Thu 7pm", "Sat 2pm", "Sun 11am"];
  $("friends").innerHTML = all.slice(0, count).map(function (f, i) {
    var strength = Math.max(18, Math.min(100, 28 + freq * 7 - i * 5 + (i < state.booked.length ? 15 : 0)));
    var interest = (f.common && f.common[0]) || f.interests[0];
    return '<div class="friend" style="animation-delay:' + i * 0.04 + 's">' +
      '<div class="av" style="background:' + f.color + '">' + initials(f.name) + "</div>" +
      '<div class="info"><div class="p-name">' + f.name + "</div>" +
      '<div class="bar"><i style="width:' + strength + '%"></i></div>' +
      '<div class="next">Next: ' + byId[interest].emoji + " " + ACTIVITIES[interest].title + " · " + days[i % 3] + "</div></div></div>";
  }).join("");
}
$("in-freq").oninput = renderSemester;

$("restart").onclick = function () { show(0); };
