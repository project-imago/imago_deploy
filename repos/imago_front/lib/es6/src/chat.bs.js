// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Matrix from "./matrix.bs.js";
import * as Printf from "bs-platform/lib/es6/printf.js";
import * as Tea_ex from "bucklescript-tea/lib/es6/src-ocaml/tea_ex.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Tea_cmd from "bucklescript-tea/lib/es6/src-ocaml/tea_cmd.js";
import * as Tea_sub from "bucklescript-tea/lib/es6/src-ocaml/tea_sub.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Tea_html from "bucklescript-tea/lib/es6/src-ocaml/tea_html.js";
import * as Tea_task from "bucklescript-tea/lib/es6/src-ocaml/tea_task.js";
import * as Tablecloth from "tablecloth-bucklescript/lib/es6/src/tablecloth.bs.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Tea_promise from "bucklescript-tea/lib/es6/src-ocaml/tea_promise.js";
import * as Caml_chrome_debugger from "bs-platform/lib/es6/caml_chrome_debugger.js";

function loggedIn(param_0) {
  return /* LoggedIn */Caml_chrome_debugger.variant("LoggedIn", 0, [param_0]);
}

function goTo(param_0) {
  return /* GoTo */Caml_chrome_debugger.variant("GoTo", 1, [param_0]);
}

function info(param_0) {
  return /* Info */Caml_chrome_debugger.variant("Info", 2, [param_0]);
}

function listInfo(param_0) {
  return /* ListInfo */Caml_chrome_debugger.variant("ListInfo", 3, [param_0]);
}

function restoredSession(param_0) {
  return /* RestoredSession */Caml_chrome_debugger.variant("RestoredSession", 4, [param_0]);
}

function gotMessage(param_0) {
  return /* GotMessage */Caml_chrome_debugger.variant("GotMessage", 5, [param_0]);
}

function saveMessage(param_0) {
  return /* SaveMessage */Caml_chrome_debugger.variant("SaveMessage", 6, [param_0]);
}

function sendMessage(param_0) {
  return /* SendMessage */Caml_chrome_debugger.variant("SendMessage", 7, [param_0]);
}

function sync(param_0) {
  return /* Sync */Caml_chrome_debugger.variant("Sync", 8, [param_0]);
}

function promiseToTask(promise) {
  return Tea_task.nativeBinding((function (cb) {
                promise.then((function (res) {
                          return Promise.resolve(Curry._1(cb, /* Ok */Caml_chrome_debugger.variant("Ok", 0, [res])));
                        })).catch((function (err) {
                        var err_to_string = function (err) {
                          return "" + (String(err) + "");
                        };
                        return Promise.resolve(Curry._1(cb, /* Error */Caml_chrome_debugger.variant("Error", 1, [err_to_string(err)])));
                      }));
                return /* () */0;
              }));
}

function login_cmd(client) {
  return Tea_promise.result(Matrix.login(client), loggedIn);
}

var restore_cmd = Tea_task.attempt(restoredSession, Tea_task.andThen((function (param) {
            return Tea_task.succeed(Matrix.new_client_params(param[1], param[0]));
          }), Tea_task.andThen((function (param) {
                if (param) {
                  var match = param[1];
                  if (match && !match[1]) {
                    var nullable_matrix_id = match[0];
                    var nullable_access_token = param[0];
                    if (!(nullable_access_token == null) && !(nullable_matrix_id == null)) {
                      return Tea_task.succeed(/* tuple */[
                                  nullable_access_token,
                                  nullable_matrix_id
                                ]);
                    } else {
                      return Tea_task.fail("Not in LocalStorage");
                    }
                  } else {
                    return Tea_task.fail("Not in LocalStorage");
                  }
                } else {
                  return Tea_task.fail("Not in LocalStorage");
                }
              }), Tea_task.sequence(/* :: */Caml_chrome_debugger.simpleVariant("::", [
                    Tea_ex.LocalStorage[/* getItem */4]("access_token"),
                    /* :: */Caml_chrome_debugger.simpleVariant("::", [
                        Tea_ex.LocalStorage[/* getItem */4]("matrix_id"),
                        /* [] */0
                      ])
                  ])))));

function save_cmd(client) {
  return Tea_task.attempt(listInfo, Tea_task.sequence(/* :: */Caml_chrome_debugger.simpleVariant("::", [
                    Tea_ex.LocalStorage[/* setItem */7]("access_token", client.getAccessToken()),
                    /* :: */Caml_chrome_debugger.simpleVariant("::", [
                        Tea_ex.LocalStorage[/* setItem */7]("matrix_id", client.credentials.userId),
                        /* [] */0
                      ])
                  ])));
}

function send_message_cmd(client, room_id, message) {
  var content = {
    body: message,
    msgtype: "m.room.message"
  };
  return Tea_promise.result(client.sendMessage(room_id, content), info);
}

var client = Matrix.new_client(/* () */0);

var model_001 = /* new_messages */{ };

var model = /* record */Caml_chrome_debugger.record([
    "client",
    "new_messages",
    "current_room"
  ], [
    client,
    model_001,
    undefined
  ]);

var init = /* tuple */[
  model,
  restore_cmd
];

function update_route(model, route) {
  var match = Js_dict.get(model[/* client */0].store.rooms, route[0]);
  if (match !== undefined) {
    var model_000 = /* client */model[/* client */0];
    var model_001 = /* new_messages */model[/* new_messages */1];
    var model_002 = /* current_room */Caml_option.some(Caml_option.valFromOption(match));
    var model$1 = /* record */Caml_chrome_debugger.record([
        "client",
        "new_messages",
        "current_room"
      ], [
        model_000,
        model_001,
        model_002
      ]);
    return /* tuple */[
            model$1,
            /* ChatRoute */Caml_chrome_debugger.simpleVariant("ChatRoute", [route])
          ];
  } else {
    return /* tuple */[
            /* record */Caml_chrome_debugger.record([
                "client",
                "new_messages",
                "current_room"
              ], [
                model[/* client */0],
                model[/* new_messages */1],
                undefined
              ]),
            /* Index */0
          ];
  }
}

function reset_route(model) {
  return /* record */Caml_chrome_debugger.record([
            "client",
            "new_messages",
            "current_room"
          ], [
            model[/* client */0],
            model[/* new_messages */1],
            undefined
          ]);
}

function update(model, param) {
  var exit = 0;
  switch (param.tag | 0) {
    case 0 : 
        var match = param[0];
        if (match.tag) {
          console.log("login failed: " + match[0]);
          return /* tuple */[
                  model,
                  Tea_cmd.none
                ];
        } else {
          console.log(match[0]);
          model[/* client */0].startClient();
          return /* tuple */[
                  model,
                  save_cmd(model[/* client */0])
                ];
        }
    case 1 : 
        return /* tuple */[
                model,
                Tea_cmd.none
              ];
    case 2 : 
    case 3 : 
        exit = 1;
        break;
    case 4 : 
        var match$1 = param[0];
        if (match$1.tag) {
          console.log("restore failed: " + match$1[0]);
          return /* tuple */[
                  model,
                  Tea_promise.result(Matrix.login(model[/* client */0]), loggedIn)
                ];
        } else {
          var client = match$1[0];
          var model_001 = /* new_messages */model[/* new_messages */1];
          var model_002 = /* current_room */model[/* current_room */2];
          var model$1 = /* record */Caml_chrome_debugger.record([
              "client",
              "new_messages",
              "current_room"
            ], [
              client,
              model_001,
              model_002
            ]);
          client.startClient();
          return /* tuple */[
                  model$1,
                  Tea_cmd.none
                ];
        }
    case 6 : 
        var match$2 = model[/* current_room */2];
        if (match$2 !== undefined) {
          model[/* new_messages */1][Caml_option.valFromOption(match$2).roomId] = param[0];
        }
        return /* tuple */[
                model,
                Tea_cmd.none
              ];
    case 7 : 
        var match$3 = model[/* current_room */2];
        var cmd;
        if (match$3 !== undefined) {
          var room = Caml_option.valFromOption(match$3);
          model[/* new_messages */1][room.roomId] = "";
          cmd = send_message_cmd(model[/* client */0], room.roomId, param[0]);
        } else {
          cmd = Tea_cmd.none;
        }
        return /* tuple */[
                model,
                cmd
              ];
    case 5 : 
    case 8 : 
        console.log(param[0]);
        return /* tuple */[
                model,
                Tea_cmd.none
              ];
    
  }
  if (exit === 1) {
    console.log(param[0][0]);
    return /* tuple */[
            model,
            Tea_cmd.none
          ];
  }
  
}

function equal_to_option(value, param) {
  if (param !== undefined) {
    return Caml_obj.caml_equal(Caml_option.valFromOption(param), value);
  } else {
    return false;
  }
}

function room_list_view(model) {
  var rooms = Js_dict.values(model[/* client */0].store.rooms);
  return Tea_html.ul(undefined, undefined, /* [] */0, Tablecloth.$$Array[/* to_list */11](Tablecloth.$$Array[/* map */20]((function (room) {
                        var room_name_text = equal_to_option(room, model[/* current_room */2]) ? Tea_html.b(undefined, undefined, /* [] */0, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                                  Tea_html.text(room.name),
                                  /* [] */0
                                ])) : Tea_html.text(room.name);
                        return Tea_html.li(undefined, undefined, /* [] */0, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                                      Tea_html.button(undefined, undefined, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                                              Tea_html.onClick(/* GoTo */Caml_chrome_debugger.variant("GoTo", 1, [/* ChatRoute */Caml_chrome_debugger.simpleVariant("ChatRoute", [/* Room */Caml_chrome_debugger.simpleVariant("Room", [room.roomId])])])),
                                              /* [] */0
                                            ]), /* :: */Caml_chrome_debugger.simpleVariant("::", [
                                              room_name_text,
                                              /* [] */0
                                            ])),
                                      /* [] */0
                                    ]));
                      }), rooms)));
}

function on_ctrl_enter($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return Tea_html.onCB("keydown", key, (function (ev) {
                var match = ev.target;
                if (match !== undefined) {
                  var match$1 = match.value;
                  if (match$1 !== undefined && ev.keyCode === 13 && (ev.ctrlKey)) {
                    return Caml_option.some(Curry._1(msg, match$1));
                  } else {
                    return undefined;
                  }
                }
                
              }));
}

function string_of_option(param) {
  if (param !== undefined) {
    return param;
  } else {
    return "";
  }
}

function get_messages(room) {
  return Tablecloth.$$Array[/* filter */19]((function (matrix_event) {
                return (matrix_event.event.type) === "m.room.message";
              }), room.getLiveTimeline().getEvents());
}

function message_view(matrix_event) {
  var message_display = Curry._2(Printf.sprintf(/* Format */Caml_chrome_debugger.simpleVariant("Format", [
              /* Char_literal */Caml_chrome_debugger.variant("Char_literal", 12, [
                  /* "<" */60,
                  /* String */Caml_chrome_debugger.variant("String", 2, [
                      /* No_padding */0,
                      /* String_literal */Caml_chrome_debugger.variant("String_literal", 11, [
                          "> ",
                          /* String */Caml_chrome_debugger.variant("String", 2, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ])
                    ])
                ]),
              "<%s> %s"
            ])), matrix_event.sender.rawDisplayName, matrix_event.event.content.body);
  return Tea_html.div(undefined, undefined, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                Tea_html.style("white-space", "pre"),
                /* [] */0
              ]), /* :: */Caml_chrome_debugger.simpleVariant("::", [
                Tea_html.text(message_display),
                /* [] */0
              ]));
}

function room_view(room, new_message) {
  var message_list = Tablecloth.$$Array[/* to_list */11](Tablecloth.$$Array[/* map */20](message_view, get_messages(room)));
  var input_area = Tea_html.textarea(undefined, undefined, /* :: */Caml_chrome_debugger.simpleVariant("::", [
          Tea_html.class$prime(room.roomId),
          /* :: */Caml_chrome_debugger.simpleVariant("::", [
              Tea_html.value(new_message),
              /* :: */Caml_chrome_debugger.simpleVariant("::", [
                  on_ctrl_enter(undefined, sendMessage),
                  /* :: */Caml_chrome_debugger.simpleVariant("::", [
                      Tea_html.onInput(undefined, saveMessage),
                      /* [] */0
                    ])
                ])
            ])
        ]), /* [] */0);
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                Tea_html.div(undefined, undefined, /* [] */0, message_list),
                /* :: */Caml_chrome_debugger.simpleVariant("::", [
                    Tea_html.div(undefined, undefined, /* [] */0, /* :: */Caml_chrome_debugger.simpleVariant("::", [
                            input_area,
                            /* [] */0
                          ])),
                    /* [] */0
                  ])
              ]));
}

function view(model, param) {
  var match = model[/* current_room */2];
  if (match !== undefined) {
    var room = Caml_option.valFromOption(match);
    return room_view(room, string_of_option(Js_dict.get(model[/* new_messages */1], room.roomId)));
  } else {
    return Tea_html.div(undefined, undefined, /* [] */0, /* [] */0);
  }
}

function subscriptions(model) {
  var match = model[/* client */0].clientRunning;
  if (match) {
    return Tea_sub.batch(/* :: */Caml_chrome_debugger.simpleVariant("::", [
                  Matrix.subscribe(model[/* client */0], gotMessage),
                  /* :: */Caml_chrome_debugger.simpleVariant("::", [
                      Matrix.subscribe_once(model[/* client */0], sync),
                      /* [] */0
                    ])
                ]));
  } else {
    return Tea_sub.none;
  }
}

export {
  loggedIn ,
  goTo ,
  info ,
  listInfo ,
  restoredSession ,
  gotMessage ,
  saveMessage ,
  sendMessage ,
  sync ,
  promiseToTask ,
  login_cmd ,
  restore_cmd ,
  save_cmd ,
  send_message_cmd ,
  init ,
  update_route ,
  reset_route ,
  update ,
  equal_to_option ,
  room_list_view ,
  on_ctrl_enter ,
  string_of_option ,
  get_messages ,
  message_view ,
  room_view ,
  view ,
  subscriptions ,
  
}
/* restore_cmd Not a pure module */