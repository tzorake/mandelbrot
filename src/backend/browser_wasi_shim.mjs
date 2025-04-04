function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function (t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}

var FD_STDIN = 0;
var FD_STDOUT = 1;
var FD_STDERR = 2;
var CLOCKID_REALTIME = 0;
var CLOCKID_MONOTONIC = 1;
var CLOCKID_PROCESS_CPUTIME_ID = 2;
var CLOCKID_THREAD_CPUTIME_ID = 3;
var ERRNO_SUCCESS = 0;
var ERRNO_2BIG = 1;
var ERRNO_ACCES = 2;
var ERRNO_ADDRINUSE = 3;
var ERRNO_ADDRNOTAVAIL = 4;
var ERRNO_AFNOSUPPORT = 5;
var ERRNO_AGAIN = 6;
var ERRNO_ALREADY = 7;
var ERRNO_BADF = 8;
var ERRNO_BADMSG = 9;
var ERRNO_BUSY = 10;
var ERRNO_CANCELED = 11;
var ERRNO_CHILD = 12;
var ERRNO_CONNABORTED = 13;
var ERRNO_CONNREFUSED = 14;
var ERRNO_CONNRESET = 15;
var ERRNO_DEADLK = 16;
var ERRNO_DESTADDRREQ = 17;
var ERRNO_DOM = 18;
var ERRNO_DQUOT = 19;
var ERRNO_EXIST = 20;
var ERRNO_FAULT = 21;
var ERRNO_FBIG = 22;
var ERRNO_HOSTUNREACH = 23;
var ERRNO_IDRM = 24;
var ERRNO_ILSEQ = 25;
var ERRNO_INPROGRESS = 26;
var ERRNO_INTR = 27;
var ERRNO_INVAL = 28;
var ERRNO_IO = 29;
var ERRNO_ISCONN = 30;
var ERRNO_ISDIR = 31;
var ERRNO_LOOP = 32;
var ERRNO_MFILE = 33;
var ERRNO_MLINK = 34;
var ERRNO_MSGSIZE = 35;
var ERRNO_MULTIHOP = 36;
var ERRNO_NAMETOOLONG = 37;
var ERRNO_NETDOWN = 38;
var ERRNO_NETRESET = 39;
var ERRNO_NETUNREACH = 40;
var ERRNO_NFILE = 41;
var ERRNO_NOBUFS = 42;
var ERRNO_NODEV = 43;
var ERRNO_NOENT = 44;
var ERRNO_NOEXEC = 45;
var ERRNO_NOLCK = 46;
var ERRNO_NOLINK = 47;
var ERRNO_NOMEM = 48;
var ERRNO_NOMSG = 49;
var ERRNO_NOPROTOOPT = 50;
var ERRNO_NOSPC = 51;
var ERRNO_NOSYS = 52;
var ERRNO_NOTCONN = 53;
var ERRNO_NOTDIR = 54;
var ERRNO_NOTEMPTY = 55;
var ERRNO_NOTRECOVERABLE = 56;
var ERRNO_NOTSOCK = 57;
var ERRNO_NOTSUP = 58;
var ERRNO_NOTTY = 59;
var ERRNO_NXIO = 60;
var ERRNO_OVERFLOW = 61;
var ERRNO_OWNERDEAD = 62;
var ERRNO_PERM = 63;
var ERRNO_PIPE = 64;
var ERRNO_PROTO = 65;
var ERRNO_PROTONOSUPPORT = 66;
var ERRNO_PROTOTYPE = 67;
var ERRNO_RANGE = 68;
var ERRNO_ROFS = 69;
var ERRNO_SPIPE = 70;
var ERRNO_SRCH = 71;
var ERRNO_STALE = 72;
var ERRNO_TIMEDOUT = 73;
var ERRNO_TXTBSY = 74;
var ERRNO_XDEV = 75;
var ERRNO_NOTCAPABLE = 76;
var RIGHTS_FD_DATASYNC = 1 << 0;
var RIGHTS_FD_READ = 1 << 1;
var RIGHTS_FD_SEEK = 1 << 2;
var RIGHTS_FD_FDSTAT_SET_FLAGS = 1 << 3;
var RIGHTS_FD_SYNC = 1 << 4;
var RIGHTS_FD_TELL = 1 << 5;
var RIGHTS_FD_WRITE = 1 << 6;
var RIGHTS_FD_ADVISE = 1 << 7;
var RIGHTS_FD_ALLOCATE = 1 << 8;
var RIGHTS_PATH_CREATE_DIRECTORY = 1 << 9;
var RIGHTS_PATH_CREATE_FILE = 1 << 10;
var RIGHTS_PATH_LINK_SOURCE = 1 << 11;
var RIGHTS_PATH_LINK_TARGET = 1 << 12;
var RIGHTS_PATH_OPEN = 1 << 13;
var RIGHTS_FD_READDIR = 1 << 14;
var RIGHTS_PATH_READLINK = 1 << 15;
var RIGHTS_PATH_RENAME_SOURCE = 1 << 16;
var RIGHTS_PATH_RENAME_TARGET = 1 << 17;
var RIGHTS_PATH_FILESTAT_GET = 1 << 18;
var RIGHTS_PATH_FILESTAT_SET_SIZE = 1 << 19;
var RIGHTS_PATH_FILESTAT_SET_TIMES = 1 << 20;
var RIGHTS_FD_FILESTAT_GET = 1 << 21;
var RIGHTS_FD_FILESTAT_SET_SIZE = 1 << 22;
var RIGHTS_FD_FILESTAT_SET_TIMES = 1 << 23;
var RIGHTS_PATH_SYMLINK = 1 << 24;
var RIGHTS_PATH_REMOVE_DIRECTORY = 1 << 25;
var RIGHTS_PATH_UNLINK_FILE = 1 << 26;
var RIGHTS_POLL_FD_READWRITE = 1 << 27;
var RIGHTS_SOCK_SHUTDOWN = 1 << 28;
var Iovec = /*#__PURE__*/function () {
  function Iovec() {
    _classCallCheck(this, Iovec);
  }
  return _createClass(Iovec, null, [{
    key: "read_bytes",
    value: function read_bytes(view, ptr) {
      var iovec = new Iovec();
      iovec.buf = view.getUint32(ptr, true);
      iovec.buf_len = view.getUint32(ptr + 4, true);
      return iovec;
    }
  }, {
    key: "read_bytes_array",
    value: function read_bytes_array(view, ptr, len) {
      var iovecs = [];
      for (var i = 0; i < len; i++) {
        iovecs.push(Iovec.read_bytes(view, ptr + 8 * i));
      }
      return iovecs;
    }
  }]);
}();
var Ciovec = /*#__PURE__*/function () {
  function Ciovec() {
    _classCallCheck(this, Ciovec);
  }
  return _createClass(Ciovec, null, [{
    key: "read_bytes",
    value: function read_bytes(view, ptr) {
      var iovec = new Ciovec();
      iovec.buf = view.getUint32(ptr, true);
      iovec.buf_len = view.getUint32(ptr + 4, true);
      return iovec;
    }
  }, {
    key: "read_bytes_array",
    value: function read_bytes_array(view, ptr, len) {
      var iovecs = [];
      for (var i = 0; i < len; i++) {
        iovecs.push(Ciovec.read_bytes(view, ptr + 8 * i));
      }
      return iovecs;
    }
  }]);
}();
var WHENCE_SET = 0;
var WHENCE_CUR = 1;
var WHENCE_END = 2;
var FILETYPE_UNKNOWN = 0;
var FILETYPE_BLOCK_DEVICE = 1;
var FILETYPE_CHARACTER_DEVICE = 2;
var FILETYPE_DIRECTORY = 3;
var FILETYPE_REGULAR_FILE = 4;
var FILETYPE_SOCKET_DGRAM = 5;
var FILETYPE_SOCKET_STREAM = 6;
var FILETYPE_SYMBOLIC_LINK = 7;
var Dirent = /*#__PURE__*/function () {
  function Dirent(next_cookie, name, type) {
    _classCallCheck(this, Dirent);
    this.d_ino = 0n;
    var encoded_name = new TextEncoder().encode(name);
    this.d_next = next_cookie;
    this.d_namlen = encoded_name.byteLength;
    this.d_type = type;
    this.dir_name = encoded_name;
  }
  return _createClass(Dirent, [{
    key: "head_length",
    value: function head_length() {
      return 24;
    }
  }, {
    key: "name_length",
    value: function name_length() {
      return this.dir_name.byteLength;
    }
  }, {
    key: "write_head_bytes",
    value: function write_head_bytes(view, ptr) {
      view.setBigUint64(ptr, this.d_next, true);
      view.setBigUint64(ptr + 8, this.d_ino, true);
      view.setUint32(ptr + 16, this.dir_name.length, true);
      view.setUint8(ptr + 20, this.d_type);
    }
  }, {
    key: "write_name_bytes",
    value: function write_name_bytes(view8, ptr, buf_len) {
      view8.set(this.dir_name.slice(0, Math.min(this.dir_name.byteLength, buf_len)), ptr);
    }
  }]);
}();
var ADVICE_NORMAL = 0;
var ADVICE_SEQUENTIAL = 1;
var ADVICE_RANDOM = 2;
var ADVICE_WILLNEED = 3;
var ADVICE_DONTNEED = 4;
var ADVICE_NOREUSE = 5;
var FDFLAGS_APPEND = 1 << 0;
var FDFLAGS_DSYNC = 1 << 1;
var FDFLAGS_NONBLOCK = 1 << 2;
var FDFLAGS_RSYNC = 1 << 3;
var FDFLAGS_SYNC = 1 << 4;
var Fdstat = /*#__PURE__*/function () {
  function Fdstat(filetype, flags) {
    _classCallCheck(this, Fdstat);
    this.fs_rights_base = 0n;
    this.fs_rights_inherited = 0n;
    this.fs_filetype = filetype;
    this.fs_flags = flags;
  }
  return _createClass(Fdstat, [{
    key: "write_bytes",
    value: function write_bytes(view, ptr) {
      view.setUint8(ptr, this.fs_filetype);
      view.setUint16(ptr + 2, this.fs_flags, true);
      view.setBigUint64(ptr + 8, this.fs_rights_base, true);
      view.setBigUint64(ptr + 16, this.fs_rights_inherited, true);
    }
  }]);
}();
var FSTFLAGS_ATIM = 1 << 0;
var FSTFLAGS_ATIM_NOW = 1 << 1;
var FSTFLAGS_MTIM = 1 << 2;
var FSTFLAGS_MTIM_NOW = 1 << 3;
var OFLAGS_CREAT = 1 << 0;
var OFLAGS_DIRECTORY = 1 << 1;
var OFLAGS_EXCL = 1 << 2;
var OFLAGS_TRUNC = 1 << 3;
var Filestat = /*#__PURE__*/function () {
  function Filestat(filetype, size) {
    _classCallCheck(this, Filestat);
    this.dev = 0n;
    this.ino = 0n;
    this.nlink = 0n;
    this.atim = 0n;
    this.mtim = 0n;
    this.ctim = 0n;
    this.filetype = filetype;
    this.size = size;
  }
  return _createClass(Filestat, [{
    key: "write_bytes",
    value: function write_bytes(view, ptr) {
      view.setBigUint64(ptr, this.dev, true);
      view.setBigUint64(ptr + 8, this.ino, true);
      view.setUint8(ptr + 16, this.filetype);
      view.setBigUint64(ptr + 24, this.nlink, true);
      view.setBigUint64(ptr + 32, this.size, true);
      view.setBigUint64(ptr + 38, this.atim, true);
      view.setBigUint64(ptr + 46, this.mtim, true);
      view.setBigUint64(ptr + 52, this.ctim, true);
    }
  }]);
}();
var EVENTTYPE_CLOCK = 0;
var EVENTTYPE_FD_READ = 1;
var EVENTTYPE_FD_WRITE = 2;
var EVENTRWFLAGS_FD_READWRITE_HANGUP = 1 << 0;
var SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1 << 0;
var SIGNAL_NONE = 0;
var SIGNAL_HUP = 1;
var SIGNAL_INT = 2;
var SIGNAL_QUIT = 3;
var SIGNAL_ILL = 4;
var SIGNAL_TRAP = 5;
var SIGNAL_ABRT = 6;
var SIGNAL_BUS = 7;
var SIGNAL_FPE = 8;
var SIGNAL_KILL = 9;
var SIGNAL_USR1 = 10;
var SIGNAL_SEGV = 11;
var SIGNAL_USR2 = 12;
var SIGNAL_PIPE = 13;
var SIGNAL_ALRM = 14;
var SIGNAL_TERM = 15;
var SIGNAL_CHLD = 16;
var SIGNAL_CONT = 17;
var SIGNAL_STOP = 18;
var SIGNAL_TSTP = 19;
var SIGNAL_TTIN = 20;
var SIGNAL_TTOU = 21;
var SIGNAL_URG = 22;
var SIGNAL_XCPU = 23;
var SIGNAL_XFSZ = 24;
var SIGNAL_VTALRM = 25;
var SIGNAL_PROF = 26;
var SIGNAL_WINCH = 27;
var SIGNAL_POLL = 28;
var SIGNAL_PWR = 29;
var SIGNAL_SYS = 30;
var RIFLAGS_RECV_PEEK = 1 << 0;
var RIFLAGS_RECV_WAITALL = 1 << 1;
var ROFLAGS_RECV_DATA_TRUNCATED = 1 << 0;
var SDFLAGS_RD = 1 << 0;
var SDFLAGS_WR = 1 << 1;
var PREOPENTYPE_DIR = 0;
var PrestatDir = /*#__PURE__*/function () {
  function PrestatDir(name) {
    _classCallCheck(this, PrestatDir);
    this.pr_name = new TextEncoder().encode(name);
  }
  return _createClass(PrestatDir, [{
    key: "write_bytes",
    value: function write_bytes(view, ptr) {
      view.setUint32(ptr, this.pr_name.byteLength, true);
    }
  }]);
}();
var Prestat = /*#__PURE__*/function () {
  function Prestat() {
    _classCallCheck(this, Prestat);
  }
  return _createClass(Prestat, [{
    key: "write_bytes",
    value: function write_bytes(view, ptr) {
      view.setUint32(ptr, this.tag, true);
      this.inner.write_bytes(view, ptr + 4);
    }
  }], [{
    key: "dir",
    value: function dir(name) {
      var prestat = new Prestat();
      prestat.tag = PREOPENTYPE_DIR;
      prestat.inner = new PrestatDir(name);
      return prestat;
    }
  }]);
}();

var wasi_defs = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FD_STDIN: FD_STDIN,
  FD_STDOUT: FD_STDOUT,
  FD_STDERR: FD_STDERR,
  CLOCKID_REALTIME: CLOCKID_REALTIME,
  CLOCKID_MONOTONIC: CLOCKID_MONOTONIC,
  CLOCKID_PROCESS_CPUTIME_ID: CLOCKID_PROCESS_CPUTIME_ID,
  CLOCKID_THREAD_CPUTIME_ID: CLOCKID_THREAD_CPUTIME_ID,
  ERRNO_SUCCESS: ERRNO_SUCCESS,
  ERRNO_2BIG: ERRNO_2BIG,
  ERRNO_ACCES: ERRNO_ACCES,
  ERRNO_ADDRINUSE: ERRNO_ADDRINUSE,
  ERRNO_ADDRNOTAVAIL: ERRNO_ADDRNOTAVAIL,
  ERRNO_AFNOSUPPORT: ERRNO_AFNOSUPPORT,
  ERRNO_AGAIN: ERRNO_AGAIN,
  ERRNO_ALREADY: ERRNO_ALREADY,
  ERRNO_BADF: ERRNO_BADF,
  ERRNO_BADMSG: ERRNO_BADMSG,
  ERRNO_BUSY: ERRNO_BUSY,
  ERRNO_CANCELED: ERRNO_CANCELED,
  ERRNO_CHILD: ERRNO_CHILD,
  ERRNO_CONNABORTED: ERRNO_CONNABORTED,
  ERRNO_CONNREFUSED: ERRNO_CONNREFUSED,
  ERRNO_CONNRESET: ERRNO_CONNRESET,
  ERRNO_DEADLK: ERRNO_DEADLK,
  ERRNO_DESTADDRREQ: ERRNO_DESTADDRREQ,
  ERRNO_DOM: ERRNO_DOM,
  ERRNO_DQUOT: ERRNO_DQUOT,
  ERRNO_EXIST: ERRNO_EXIST,
  ERRNO_FAULT: ERRNO_FAULT,
  ERRNO_FBIG: ERRNO_FBIG,
  ERRNO_HOSTUNREACH: ERRNO_HOSTUNREACH,
  ERRNO_IDRM: ERRNO_IDRM,
  ERRNO_ILSEQ: ERRNO_ILSEQ,
  ERRNO_INPROGRESS: ERRNO_INPROGRESS,
  ERRNO_INTR: ERRNO_INTR,
  ERRNO_INVAL: ERRNO_INVAL,
  ERRNO_IO: ERRNO_IO,
  ERRNO_ISCONN: ERRNO_ISCONN,
  ERRNO_ISDIR: ERRNO_ISDIR,
  ERRNO_LOOP: ERRNO_LOOP,
  ERRNO_MFILE: ERRNO_MFILE,
  ERRNO_MLINK: ERRNO_MLINK,
  ERRNO_MSGSIZE: ERRNO_MSGSIZE,
  ERRNO_MULTIHOP: ERRNO_MULTIHOP,
  ERRNO_NAMETOOLONG: ERRNO_NAMETOOLONG,
  ERRNO_NETDOWN: ERRNO_NETDOWN,
  ERRNO_NETRESET: ERRNO_NETRESET,
  ERRNO_NETUNREACH: ERRNO_NETUNREACH,
  ERRNO_NFILE: ERRNO_NFILE,
  ERRNO_NOBUFS: ERRNO_NOBUFS,
  ERRNO_NODEV: ERRNO_NODEV,
  ERRNO_NOENT: ERRNO_NOENT,
  ERRNO_NOEXEC: ERRNO_NOEXEC,
  ERRNO_NOLCK: ERRNO_NOLCK,
  ERRNO_NOLINK: ERRNO_NOLINK,
  ERRNO_NOMEM: ERRNO_NOMEM,
  ERRNO_NOMSG: ERRNO_NOMSG,
  ERRNO_NOPROTOOPT: ERRNO_NOPROTOOPT,
  ERRNO_NOSPC: ERRNO_NOSPC,
  ERRNO_NOSYS: ERRNO_NOSYS,
  ERRNO_NOTCONN: ERRNO_NOTCONN,
  ERRNO_NOTDIR: ERRNO_NOTDIR,
  ERRNO_NOTEMPTY: ERRNO_NOTEMPTY,
  ERRNO_NOTRECOVERABLE: ERRNO_NOTRECOVERABLE,
  ERRNO_NOTSOCK: ERRNO_NOTSOCK,
  ERRNO_NOTSUP: ERRNO_NOTSUP,
  ERRNO_NOTTY: ERRNO_NOTTY,
  ERRNO_NXIO: ERRNO_NXIO,
  ERRNO_OVERFLOW: ERRNO_OVERFLOW,
  ERRNO_OWNERDEAD: ERRNO_OWNERDEAD,
  ERRNO_PERM: ERRNO_PERM,
  ERRNO_PIPE: ERRNO_PIPE,
  ERRNO_PROTO: ERRNO_PROTO,
  ERRNO_PROTONOSUPPORT: ERRNO_PROTONOSUPPORT,
  ERRNO_PROTOTYPE: ERRNO_PROTOTYPE,
  ERRNO_RANGE: ERRNO_RANGE,
  ERRNO_ROFS: ERRNO_ROFS,
  ERRNO_SPIPE: ERRNO_SPIPE,
  ERRNO_SRCH: ERRNO_SRCH,
  ERRNO_STALE: ERRNO_STALE,
  ERRNO_TIMEDOUT: ERRNO_TIMEDOUT,
  ERRNO_TXTBSY: ERRNO_TXTBSY,
  ERRNO_XDEV: ERRNO_XDEV,
  ERRNO_NOTCAPABLE: ERRNO_NOTCAPABLE,
  RIGHTS_FD_DATASYNC: RIGHTS_FD_DATASYNC,
  RIGHTS_FD_READ: RIGHTS_FD_READ,
  RIGHTS_FD_SEEK: RIGHTS_FD_SEEK,
  RIGHTS_FD_FDSTAT_SET_FLAGS: RIGHTS_FD_FDSTAT_SET_FLAGS,
  RIGHTS_FD_SYNC: RIGHTS_FD_SYNC,
  RIGHTS_FD_TELL: RIGHTS_FD_TELL,
  RIGHTS_FD_WRITE: RIGHTS_FD_WRITE,
  RIGHTS_FD_ADVISE: RIGHTS_FD_ADVISE,
  RIGHTS_FD_ALLOCATE: RIGHTS_FD_ALLOCATE,
  RIGHTS_PATH_CREATE_DIRECTORY: RIGHTS_PATH_CREATE_DIRECTORY,
  RIGHTS_PATH_CREATE_FILE: RIGHTS_PATH_CREATE_FILE,
  RIGHTS_PATH_LINK_SOURCE: RIGHTS_PATH_LINK_SOURCE,
  RIGHTS_PATH_LINK_TARGET: RIGHTS_PATH_LINK_TARGET,
  RIGHTS_PATH_OPEN: RIGHTS_PATH_OPEN,
  RIGHTS_FD_READDIR: RIGHTS_FD_READDIR,
  RIGHTS_PATH_READLINK: RIGHTS_PATH_READLINK,
  RIGHTS_PATH_RENAME_SOURCE: RIGHTS_PATH_RENAME_SOURCE,
  RIGHTS_PATH_RENAME_TARGET: RIGHTS_PATH_RENAME_TARGET,
  RIGHTS_PATH_FILESTAT_GET: RIGHTS_PATH_FILESTAT_GET,
  RIGHTS_PATH_FILESTAT_SET_SIZE: RIGHTS_PATH_FILESTAT_SET_SIZE,
  RIGHTS_PATH_FILESTAT_SET_TIMES: RIGHTS_PATH_FILESTAT_SET_TIMES,
  RIGHTS_FD_FILESTAT_GET: RIGHTS_FD_FILESTAT_GET,
  RIGHTS_FD_FILESTAT_SET_SIZE: RIGHTS_FD_FILESTAT_SET_SIZE,
  RIGHTS_FD_FILESTAT_SET_TIMES: RIGHTS_FD_FILESTAT_SET_TIMES,
  RIGHTS_PATH_SYMLINK: RIGHTS_PATH_SYMLINK,
  RIGHTS_PATH_REMOVE_DIRECTORY: RIGHTS_PATH_REMOVE_DIRECTORY,
  RIGHTS_PATH_UNLINK_FILE: RIGHTS_PATH_UNLINK_FILE,
  RIGHTS_POLL_FD_READWRITE: RIGHTS_POLL_FD_READWRITE,
  RIGHTS_SOCK_SHUTDOWN: RIGHTS_SOCK_SHUTDOWN,
  Iovec: Iovec,
  Ciovec: Ciovec,
  WHENCE_SET: WHENCE_SET,
  WHENCE_CUR: WHENCE_CUR,
  WHENCE_END: WHENCE_END,
  FILETYPE_UNKNOWN: FILETYPE_UNKNOWN,
  FILETYPE_BLOCK_DEVICE: FILETYPE_BLOCK_DEVICE,
  FILETYPE_CHARACTER_DEVICE: FILETYPE_CHARACTER_DEVICE,
  FILETYPE_DIRECTORY: FILETYPE_DIRECTORY,
  FILETYPE_REGULAR_FILE: FILETYPE_REGULAR_FILE,
  FILETYPE_SOCKET_DGRAM: FILETYPE_SOCKET_DGRAM,
  FILETYPE_SOCKET_STREAM: FILETYPE_SOCKET_STREAM,
  FILETYPE_SYMBOLIC_LINK: FILETYPE_SYMBOLIC_LINK,
  Dirent: Dirent,
  ADVICE_NORMAL: ADVICE_NORMAL,
  ADVICE_SEQUENTIAL: ADVICE_SEQUENTIAL,
  ADVICE_RANDOM: ADVICE_RANDOM,
  ADVICE_WILLNEED: ADVICE_WILLNEED,
  ADVICE_DONTNEED: ADVICE_DONTNEED,
  ADVICE_NOREUSE: ADVICE_NOREUSE,
  FDFLAGS_APPEND: FDFLAGS_APPEND,
  FDFLAGS_DSYNC: FDFLAGS_DSYNC,
  FDFLAGS_NONBLOCK: FDFLAGS_NONBLOCK,
  FDFLAGS_RSYNC: FDFLAGS_RSYNC,
  FDFLAGS_SYNC: FDFLAGS_SYNC,
  Fdstat: Fdstat,
  FSTFLAGS_ATIM: FSTFLAGS_ATIM,
  FSTFLAGS_ATIM_NOW: FSTFLAGS_ATIM_NOW,
  FSTFLAGS_MTIM: FSTFLAGS_MTIM,
  FSTFLAGS_MTIM_NOW: FSTFLAGS_MTIM_NOW,
  OFLAGS_CREAT: OFLAGS_CREAT,
  OFLAGS_DIRECTORY: OFLAGS_DIRECTORY,
  OFLAGS_EXCL: OFLAGS_EXCL,
  OFLAGS_TRUNC: OFLAGS_TRUNC,
  Filestat: Filestat,
  EVENTTYPE_CLOCK: EVENTTYPE_CLOCK,
  EVENTTYPE_FD_READ: EVENTTYPE_FD_READ,
  EVENTTYPE_FD_WRITE: EVENTTYPE_FD_WRITE,
  EVENTRWFLAGS_FD_READWRITE_HANGUP: EVENTRWFLAGS_FD_READWRITE_HANGUP,
  SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME: SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME,
  SIGNAL_NONE: SIGNAL_NONE,
  SIGNAL_HUP: SIGNAL_HUP,
  SIGNAL_INT: SIGNAL_INT,
  SIGNAL_QUIT: SIGNAL_QUIT,
  SIGNAL_ILL: SIGNAL_ILL,
  SIGNAL_TRAP: SIGNAL_TRAP,
  SIGNAL_ABRT: SIGNAL_ABRT,
  SIGNAL_BUS: SIGNAL_BUS,
  SIGNAL_FPE: SIGNAL_FPE,
  SIGNAL_KILL: SIGNAL_KILL,
  SIGNAL_USR1: SIGNAL_USR1,
  SIGNAL_SEGV: SIGNAL_SEGV,
  SIGNAL_USR2: SIGNAL_USR2,
  SIGNAL_PIPE: SIGNAL_PIPE,
  SIGNAL_ALRM: SIGNAL_ALRM,
  SIGNAL_TERM: SIGNAL_TERM,
  SIGNAL_CHLD: SIGNAL_CHLD,
  SIGNAL_CONT: SIGNAL_CONT,
  SIGNAL_STOP: SIGNAL_STOP,
  SIGNAL_TSTP: SIGNAL_TSTP,
  SIGNAL_TTIN: SIGNAL_TTIN,
  SIGNAL_TTOU: SIGNAL_TTOU,
  SIGNAL_URG: SIGNAL_URG,
  SIGNAL_XCPU: SIGNAL_XCPU,
  SIGNAL_XFSZ: SIGNAL_XFSZ,
  SIGNAL_VTALRM: SIGNAL_VTALRM,
  SIGNAL_PROF: SIGNAL_PROF,
  SIGNAL_WINCH: SIGNAL_WINCH,
  SIGNAL_POLL: SIGNAL_POLL,
  SIGNAL_PWR: SIGNAL_PWR,
  SIGNAL_SYS: SIGNAL_SYS,
  RIFLAGS_RECV_PEEK: RIFLAGS_RECV_PEEK,
  RIFLAGS_RECV_WAITALL: RIFLAGS_RECV_WAITALL,
  ROFLAGS_RECV_DATA_TRUNCATED: ROFLAGS_RECV_DATA_TRUNCATED,
  SDFLAGS_RD: SDFLAGS_RD,
  SDFLAGS_WR: SDFLAGS_WR,
  PREOPENTYPE_DIR: PREOPENTYPE_DIR,
  PrestatDir: PrestatDir,
  Prestat: Prestat
});

var Debug = /*#__PURE__*/function () {
  function Debug(isEnabled) {
    _classCallCheck(this, Debug);
    this.isEnabled = isEnabled;
    this.prefix = "wasi:";
    this.enable(isEnabled);
  }
  return _createClass(Debug, [{
    key: "enable",
    value: function enable(enabled) {
      this.log = createLogger(enabled === undefined ? true : enabled, this.prefix);
    }
  }, {
    key: "enabled",
    get: function get() {
      return this.isEnabled;
    }
  }]);
}();
function createLogger(enabled, prefix) {
  if (enabled) {
    var a = console.log.bind(console, "%c%s", "color: #265BA0", prefix);
    return a;
  } else {
    return function () {};
  }
}
var debug = new Debug(false);

var WASIProcExit = /*#__PURE__*/function (_Error) {
  function WASIProcExit(code) {
    var _this;
    _classCallCheck(this, WASIProcExit);
    _this = _callSuper(this, WASIProcExit, ["exit with exit code " + code]);
    _this.code = code;
    return _this;
  }
  _inherits(WASIProcExit, _Error);
  return _createClass(WASIProcExit);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var WASI = /*#__PURE__*/function () {
  function WASI(args, env, fds) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck(this, WASI);
    this.args = [];
    this.env = [];
    this.fds = [];
    debug.enable(options.debug);
    this.args = args;
    this.env = env;
    this.fds = fds;
    var self = this;
    this.wasiImport = {
      args_sizes_get: function args_sizes_get(argc, argv_buf_size) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        buffer.setUint32(argc, self.args.length, true);
        var buf_size = 0;
        var _iterator = _createForOfIteratorHelper(self.args),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var arg = _step.value;
            buf_size += arg.length + 1;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        buffer.setUint32(argv_buf_size, buf_size, true);
        debug.log(buffer.getUint32(argc, true), buffer.getUint32(argv_buf_size, true));
        return 0;
      },
      args_get: function args_get(argv, argv_buf) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        var orig_argv_buf = argv_buf;
        for (var i = 0; i < self.args.length; i++) {
          buffer.setUint32(argv, argv_buf, true);
          argv += 4;
          var arg = new TextEncoder().encode(self.args[i]);
          buffer8.set(arg, argv_buf);
          buffer.setUint8(argv_buf + arg.length, 0);
          argv_buf += arg.length + 1;
        }
        if (debug.enabled) {
          debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_argv_buf, argv_buf)));
        }
        return 0;
      },
      environ_sizes_get: function environ_sizes_get(environ_count, environ_size) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        buffer.setUint32(environ_count, self.env.length, true);
        var buf_size = 0;
        var _iterator2 = _createForOfIteratorHelper(self.env),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var environ = _step2.value;
            buf_size += environ.length + 1;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        buffer.setUint32(environ_size, buf_size, true);
        debug.log(buffer.getUint32(environ_count, true), buffer.getUint32(environ_size, true));
        return 0;
      },
      environ_get: function environ_get(environ, environ_buf) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        var orig_environ_buf = environ_buf;
        for (var i = 0; i < self.env.length; i++) {
          buffer.setUint32(environ, environ_buf, true);
          environ += 4;
          var e = new TextEncoder().encode(self.env[i]);
          buffer8.set(e, environ_buf);
          buffer.setUint8(environ_buf + e.length, 0);
          environ_buf += e.length + 1;
        }
        if (debug.enabled) {
          debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_environ_buf, environ_buf)));
        }
        return 0;
      },
      clock_res_get: function clock_res_get(id, res_ptr) {
        var resolutionValue;
        switch (id) {
          case CLOCKID_MONOTONIC:
            {
              resolutionValue = 5000n;
              break;
            }
          case CLOCKID_REALTIME:
            {
              resolutionValue = 1000000n;
              break;
            }
          default:
            return ERRNO_NOSYS;
        }
        var view = new DataView(self.inst.exports.memory.buffer);
        view.setBigUint64(res_ptr, resolutionValue, true);
        return ERRNO_SUCCESS;
      },
      clock_time_get: function clock_time_get(id, precision, time) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        if (id === CLOCKID_REALTIME) {
          buffer.setBigUint64(time, BigInt(new Date().getTime()) * 1000000n, true);
        } else if (id == CLOCKID_MONOTONIC) {
          var monotonic_time;
          try {
            monotonic_time = BigInt(Math.round(performance.now() * 1e6));
          } catch (e) {
            monotonic_time = 0n;
          }
          buffer.setBigUint64(time, monotonic_time, true);
        } else {
          buffer.setBigUint64(time, 0n, true);
        }
        return 0;
      },
      fd_advise: function fd_advise(fd, offset, len, advice) {
        if (self.fds[fd] != undefined) {
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_allocate: function fd_allocate(fd, offset, len) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_allocate(offset, len);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_close: function fd_close(fd) {
        if (self.fds[fd] != undefined) {
          var ret = self.fds[fd].fd_close();
          self.fds[fd] = undefined;
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_datasync: function fd_datasync(fd) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_sync();
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_get: function fd_fdstat_get(fd, fdstat_ptr) {
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_fdsta = self.fds[fd].fd_fdstat_get(),
            ret = _self$fds$fd$fd_fdsta.ret,
            fdstat = _self$fds$fd$fd_fdsta.fdstat;
          if (fdstat != null) {
            fdstat.write_bytes(new DataView(self.inst.exports.memory.buffer), fdstat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_set_flags: function fd_fdstat_set_flags(fd, flags) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_fdstat_set_flags(flags);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_set_rights: function fd_fdstat_set_rights(fd, fs_rights_base, fs_rights_inheriting) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_get: function fd_filestat_get(fd, filestat_ptr) {
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_files = self.fds[fd].fd_filestat_get(),
            ret = _self$fds$fd$fd_files.ret,
            filestat = _self$fds$fd$fd_files.filestat;
          if (filestat != null) {
            filestat.write_bytes(new DataView(self.inst.exports.memory.buffer), filestat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_set_size: function fd_filestat_set_size(fd, size) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_filestat_set_size(size);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_set_times: function fd_filestat_set_times(fd, atim, mtim, fst_flags) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_filestat_set_times(atim, mtim, fst_flags);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_pread: function fd_pread(fd, iovs_ptr, iovs_len, offset, nread_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          var nread = 0;
          var _iterator3 = _createForOfIteratorHelper(iovecs),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var iovec = _step3.value;
              var _self$fds$fd$fd_pread = self.fds[fd].fd_pread(iovec.buf_len, offset),
                ret = _self$fds$fd$fd_pread.ret,
                data = _self$fds$fd$fd_pread.data;
              if (ret != ERRNO_SUCCESS) {
                buffer.setUint32(nread_ptr, nread, true);
                return ret;
              }
              buffer8.set(data, iovec.buf);
              nread += data.length;
              offset += BigInt(data.length);
              if (data.length != iovec.buf_len) {
                break;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          buffer.setUint32(nread_ptr, nread, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_prestat_get: function fd_prestat_get(fd, buf_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_prest = self.fds[fd].fd_prestat_get(),
            ret = _self$fds$fd$fd_prest.ret,
            prestat = _self$fds$fd$fd_prest.prestat;
          if (prestat != null) {
            prestat.write_bytes(buffer, buf_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_prestat_dir_name: function fd_prestat_dir_name(fd, path_ptr, path_len) {
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_prest2 = self.fds[fd].fd_prestat_get(),
            ret = _self$fds$fd$fd_prest2.ret,
            prestat = _self$fds$fd$fd_prest2.prestat;
          if (prestat == null) {
            return ret;
          }
          var prestat_dir_name = prestat.inner.pr_name;
          var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
          buffer8.set(prestat_dir_name.slice(0, path_len), path_ptr);
          return prestat_dir_name.byteLength > path_len ? ERRNO_NAMETOOLONG : ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_pwrite: function fd_pwrite(fd, iovs_ptr, iovs_len, offset, nwritten_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          var nwritten = 0;
          var _iterator4 = _createForOfIteratorHelper(iovecs),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var iovec = _step4.value;
              var data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
              var _self$fds$fd$fd_pwrit = self.fds[fd].fd_pwrite(data, offset),
                ret = _self$fds$fd$fd_pwrit.ret,
                nwritten_part = _self$fds$fd$fd_pwrit.nwritten;
              if (ret != ERRNO_SUCCESS) {
                buffer.setUint32(nwritten_ptr, nwritten, true);
                return ret;
              }
              nwritten += nwritten_part;
              offset += BigInt(nwritten_part);
              if (nwritten_part != data.byteLength) {
                break;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_read: function fd_read(fd, iovs_ptr, iovs_len, nread_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          var nread = 0;
          var _iterator5 = _createForOfIteratorHelper(iovecs),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var iovec = _step5.value;
              var _self$fds$fd$fd_read = self.fds[fd].fd_read(iovec.buf_len),
                ret = _self$fds$fd$fd_read.ret,
                data = _self$fds$fd$fd_read.data;
              if (ret != ERRNO_SUCCESS) {
                buffer.setUint32(nread_ptr, nread, true);
                return ret;
              }
              buffer8.set(data, iovec.buf);
              nread += data.length;
              if (data.length != iovec.buf_len) {
                break;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          buffer.setUint32(nread_ptr, nread, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_readdir: function fd_readdir(fd, buf, buf_len, cookie, bufused_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var bufused = 0;
          while (true) {
            var _self$fds$fd$fd_readd = self.fds[fd].fd_readdir_single(cookie),
              ret = _self$fds$fd$fd_readd.ret,
              dirent = _self$fds$fd$fd_readd.dirent;
            if (ret != 0) {
              buffer.setUint32(bufused_ptr, bufused, true);
              return ret;
            }
            if (dirent == null) {
              break;
            }
            if (buf_len - bufused < dirent.head_length()) {
              bufused = buf_len;
              break;
            }
            var head_bytes = new ArrayBuffer(dirent.head_length());
            dirent.write_head_bytes(new DataView(head_bytes), 0);
            buffer8.set(new Uint8Array(head_bytes).slice(0, Math.min(head_bytes.byteLength, buf_len - bufused)), buf);
            buf += dirent.head_length();
            bufused += dirent.head_length();
            if (buf_len - bufused < dirent.name_length()) {
              bufused = buf_len;
              break;
            }
            dirent.write_name_bytes(buffer8, buf, buf_len - bufused);
            buf += dirent.name_length();
            bufused += dirent.name_length();
            cookie = dirent.d_next;
          }
          buffer.setUint32(bufused_ptr, bufused, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_renumber: function fd_renumber(fd, to) {
        if (self.fds[fd] != undefined && self.fds[to] != undefined) {
          var ret = self.fds[to].fd_close();
          if (ret != 0) {
            return ret;
          }
          self.fds[to] = self.fds[fd];
          self.fds[fd] = undefined;
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_seek: function fd_seek(fd, offset, whence, offset_out_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_seek = self.fds[fd].fd_seek(offset, whence),
            ret = _self$fds$fd$fd_seek.ret,
            offset_out = _self$fds$fd$fd_seek.offset;
          buffer.setBigInt64(offset_out_ptr, offset_out, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_sync: function fd_sync(fd) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_sync();
        } else {
          return ERRNO_BADF;
        }
      },
      fd_tell: function fd_tell(fd, offset_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var _self$fds$fd$fd_tell = self.fds[fd].fd_tell(),
            ret = _self$fds$fd$fd_tell.ret,
            offset = _self$fds$fd$fd_tell.offset;
          buffer.setBigUint64(offset_ptr, offset, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_write: function fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          var nwritten = 0;
          var _iterator6 = _createForOfIteratorHelper(iovecs),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var iovec = _step6.value;
              var data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
              var _self$fds$fd$fd_write = self.fds[fd].fd_write(data),
                ret = _self$fds$fd$fd_write.ret,
                nwritten_part = _self$fds$fd$fd_write.nwritten;
              if (ret != ERRNO_SUCCESS) {
                buffer.setUint32(nwritten_ptr, nwritten, true);
                return ret;
              }
              nwritten += nwritten_part;
              if (nwritten_part != data.byteLength) {
                break;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      path_create_directory: function path_create_directory(fd, path_ptr, path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self.fds[fd].path_create_directory(path);
        } else {
          return ERRNO_BADF;
        }
      },
      path_filestat_get: function path_filestat_get(fd, flags, path_ptr, path_len, filestat_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          var _self$fds$fd$path_fil = self.fds[fd].path_filestat_get(flags, path),
            ret = _self$fds$fd$path_fil.ret,
            filestat = _self$fds$fd$path_fil.filestat;
          if (filestat != null) {
            filestat.write_bytes(buffer, filestat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_filestat_set_times: function path_filestat_set_times(fd, flags, path_ptr, path_len, atim, mtim, fst_flags) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self.fds[fd].path_filestat_set_times(flags, path, atim, mtim, fst_flags);
        } else {
          return ERRNO_BADF;
        }
      },
      path_link: function path_link(old_fd, old_flags, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[old_fd] != undefined && self.fds[new_fd] != undefined) {
          var old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
          var new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
          var _self$fds$old_fd$path = self.fds[old_fd].path_lookup(old_path, old_flags),
            ret = _self$fds$old_fd$path.ret,
            inode_obj = _self$fds$old_fd$path.inode_obj;
          if (inode_obj == null) {
            return ret;
          }
          return self.fds[new_fd].path_link(new_path, inode_obj, false);
        } else {
          return ERRNO_BADF;
        }
      },
      path_open: function path_open(fd, dirflags, path_ptr, path_len, oflags, fs_rights_base, fs_rights_inheriting, fd_flags, opened_fd_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          debug.log(path);
          var _self$fds$fd$path_ope = self.fds[fd].path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags),
            ret = _self$fds$fd$path_ope.ret,
            fd_obj = _self$fds$fd$path_ope.fd_obj;
          if (ret != 0) {
            return ret;
          }
          self.fds.push(fd_obj);
          var opened_fd = self.fds.length - 1;
          buffer.setUint32(opened_fd_ptr, opened_fd, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      path_readlink: function path_readlink(fd, path_ptr, path_len, buf_ptr, buf_len, nread_ptr) {
        var buffer = new DataView(self.inst.exports.memory.buffer);
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          debug.log(path);
          var _self$fds$fd$path_rea = self.fds[fd].path_readlink(path),
            ret = _self$fds$fd$path_rea.ret,
            data = _self$fds$fd$path_rea.data;
          if (data != null) {
            var data_buf = new TextEncoder().encode(data);
            if (data_buf.length > buf_len) {
              buffer.setUint32(nread_ptr, 0, true);
              return ERRNO_BADF;
            }
            buffer8.set(data_buf, buf_ptr);
            buffer.setUint32(nread_ptr, data_buf.length, true);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_remove_directory: function path_remove_directory(fd, path_ptr, path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self.fds[fd].path_remove_directory(path);
        } else {
          return ERRNO_BADF;
        }
      },
      path_rename: function path_rename(fd, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined && self.fds[new_fd] != undefined) {
          var old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
          var new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
          var _self$fds$fd$path_unl = self.fds[fd].path_unlink(old_path),
            ret = _self$fds$fd$path_unl.ret,
            inode_obj = _self$fds$fd$path_unl.inode_obj;
          if (inode_obj == null) {
            return ret;
          }
          ret = self.fds[new_fd].path_link(new_path, inode_obj, true);
          if (ret != ERRNO_SUCCESS) {
            if (self.fds[fd].path_link(old_path, inode_obj, true) != ERRNO_SUCCESS) {
              throw "path_link should always return success when relinking an inode back to the original place";
            }
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_symlink: function path_symlink(old_path_ptr, old_path_len, fd, new_path_ptr, new_path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
          new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
          return ERRNO_NOTSUP;
        } else {
          return ERRNO_BADF;
        }
      },
      path_unlink_file: function path_unlink_file(fd, path_ptr, path_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          var path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self.fds[fd].path_unlink_file(path);
        } else {
          return ERRNO_BADF;
        }
      },
      poll_oneoff: function poll_oneoff(in_, out, nsubscriptions) {
        throw "async io not supported";
      },
      proc_exit: function proc_exit(exit_code) {
        throw new WASIProcExit(exit_code);
      },
      proc_raise: function proc_raise(sig) {
        throw "raised signal " + sig;
      },
      sched_yield: function sched_yield() {},
      random_get: function random_get(buf, buf_len) {
        var buffer8 = new Uint8Array(self.inst.exports.memory.buffer).subarray(buf, buf + buf_len);
        if ("crypto" in globalThis && !(self.inst.exports.memory.buffer instanceof SharedArrayBuffer)) {
          for (var i = 0; i < buf_len; i += 65536) {
            crypto.getRandomValues(buffer8.subarray(i, i + 65536));
          }
        } else {
          for (var _i = 0; _i < buf_len; _i++) {
            buffer8[_i] = Math.random() * 256 | 0;
          }
        }
      },
      sock_recv: function sock_recv(fd, ri_data, ri_flags) {
        throw "sockets not supported";
      },
      sock_send: function sock_send(fd, si_data, si_flags) {
        throw "sockets not supported";
      },
      sock_shutdown: function sock_shutdown(fd, how) {
        throw "sockets not supported";
      },
      sock_accept: function sock_accept(fd, flags) {
        throw "sockets not supported";
      }
    };
  }
  return _createClass(WASI, [{
    key: "start",
    value: function start(instance) {
      this.inst = instance;
      try {
        instance.exports._start();
        return 0;
      } catch (e) {
        if (e instanceof WASIProcExit) {
          return e.code;
        } else {
          throw e;
        }
      }
    }
  }, {
    key: "initialize",
    value: function initialize(instance) {
      this.inst = instance;
      if (instance.exports._initialize) {
        instance.exports._initialize();
      }
    }
  }]);
}();

var Fd = /*#__PURE__*/function () {
  function Fd() {
    _classCallCheck(this, Fd);
  }
  return _createClass(Fd, [{
    key: "fd_allocate",
    value: function fd_allocate(offset, len) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "fd_close",
    value: function fd_close() {
      return 0;
    }
  }, {
    key: "fd_fdstat_get",
    value: function fd_fdstat_get() {
      return {
        ret: ERRNO_NOTSUP,
        fdstat: null
      };
    }
  }, {
    key: "fd_fdstat_set_flags",
    value: function fd_fdstat_set_flags(flags) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "fd_fdstat_set_rights",
    value: function fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "fd_filestat_get",
    value: function fd_filestat_get() {
      return {
        ret: ERRNO_NOTSUP,
        filestat: null
      };
    }
  }, {
    key: "fd_filestat_set_size",
    value: function fd_filestat_set_size(size) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "fd_filestat_set_times",
    value: function fd_filestat_set_times(atim, mtim, fst_flags) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "fd_pread",
    value: function fd_pread(size, offset) {
      return {
        ret: ERRNO_NOTSUP,
        data: new Uint8Array()
      };
    }
  }, {
    key: "fd_prestat_get",
    value: function fd_prestat_get() {
      return {
        ret: ERRNO_NOTSUP,
        prestat: null
      };
    }
  }, {
    key: "fd_pwrite",
    value: function fd_pwrite(data, offset) {
      return {
        ret: ERRNO_NOTSUP,
        nwritten: 0
      };
    }
  }, {
    key: "fd_read",
    value: function fd_read(size) {
      return {
        ret: ERRNO_NOTSUP,
        data: new Uint8Array()
      };
    }
  }, {
    key: "fd_readdir_single",
    value: function fd_readdir_single(cookie) {
      return {
        ret: ERRNO_NOTSUP,
        dirent: null
      };
    }
  }, {
    key: "fd_seek",
    value: function fd_seek(offset, whence) {
      return {
        ret: ERRNO_NOTSUP,
        offset: 0n
      };
    }
  }, {
    key: "fd_sync",
    value: function fd_sync() {
      return 0;
    }
  }, {
    key: "fd_tell",
    value: function fd_tell() {
      return {
        ret: ERRNO_NOTSUP,
        offset: 0n
      };
    }
  }, {
    key: "fd_write",
    value: function fd_write(data) {
      return {
        ret: ERRNO_NOTSUP,
        nwritten: 0
      };
    }
  }, {
    key: "path_create_directory",
    value: function path_create_directory(path) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "path_filestat_get",
    value: function path_filestat_get(flags, path) {
      return {
        ret: ERRNO_NOTSUP,
        filestat: null
      };
    }
  }, {
    key: "path_filestat_set_times",
    value: function path_filestat_set_times(flags, path, atim, mtim, fst_flags) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "path_link",
    value: function path_link(path, inode, allow_dir) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "path_unlink",
    value: function path_unlink(path) {
      return {
        ret: ERRNO_NOTSUP,
        inode_obj: null
      };
    }
  }, {
    key: "path_lookup",
    value: function path_lookup(path, dirflags) {
      return {
        ret: ERRNO_NOTSUP,
        inode_obj: null
      };
    }
  }, {
    key: "path_open",
    value: function path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
      return {
        ret: ERRNO_NOTDIR,
        fd_obj: null
      };
    }
  }, {
    key: "path_readlink",
    value: function path_readlink(path) {
      return {
        ret: ERRNO_NOTSUP,
        data: null
      };
    }
  }, {
    key: "path_remove_directory",
    value: function path_remove_directory(path) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "path_rename",
    value: function path_rename(old_path, new_fd, new_path) {
      return ERRNO_NOTSUP;
    }
  }, {
    key: "path_unlink_file",
    value: function path_unlink_file(path) {
      return ERRNO_NOTSUP;
    }
  }]);
}();
var Inode = /*#__PURE__*/_createClass(function Inode() {
  _classCallCheck(this, Inode);
});

var OpenFile = /*#__PURE__*/function (_Fd) {
  function OpenFile(file) {
    var _this;
    _classCallCheck(this, OpenFile);
    _this = _callSuper(this, OpenFile);
    _this.file_pos = 0n;
    _this.file = file;
    return _this;
  }
  _inherits(OpenFile, _Fd);
  return _createClass(OpenFile, [{
    key: "fd_allocate",
    value: function fd_allocate(offset, len) {
      if (this.file.size > offset + len) ; else {
        var new_data = new Uint8Array(Number(offset + len));
        new_data.set(this.file.data, 0);
        this.file.data = new_data;
      }
      return ERRNO_SUCCESS;
    }
  }, {
    key: "fd_fdstat_get",
    value: function fd_fdstat_get() {
      return {
        ret: 0,
        fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0)
      };
    }
  }, {
    key: "fd_filestat_set_size",
    value: function fd_filestat_set_size(size) {
      if (this.file.size > size) {
        this.file.data = new Uint8Array(this.file.data.buffer.slice(0, Number(size)));
      } else {
        var new_data = new Uint8Array(Number(size));
        new_data.set(this.file.data, 0);
        this.file.data = new_data;
      }
      return ERRNO_SUCCESS;
    }
  }, {
    key: "fd_read",
    value: function fd_read(size) {
      var slice = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(size)));
      this.file_pos += BigInt(slice.length);
      return {
        ret: 0,
        data: slice
      };
    }
  }, {
    key: "fd_pread",
    value: function fd_pread(size, offset) {
      var slice = this.file.data.slice(Number(offset), Number(offset + BigInt(size)));
      return {
        ret: 0,
        data: slice
      };
    }
  }, {
    key: "fd_seek",
    value: function fd_seek(offset, whence) {
      var calculated_offset;
      switch (whence) {
        case WHENCE_SET:
          calculated_offset = offset;
          break;
        case WHENCE_CUR:
          calculated_offset = this.file_pos + offset;
          break;
        case WHENCE_END:
          calculated_offset = BigInt(this.file.data.byteLength) + offset;
          break;
        default:
          return {
            ret: ERRNO_INVAL,
            offset: 0n
          };
      }
      if (calculated_offset < 0) {
        return {
          ret: ERRNO_INVAL,
          offset: 0n
        };
      }
      this.file_pos = calculated_offset;
      return {
        ret: 0,
        offset: this.file_pos
      };
    }
  }, {
    key: "fd_tell",
    value: function fd_tell() {
      return {
        ret: 0,
        offset: this.file_pos
      };
    }
  }, {
    key: "fd_write",
    value: function fd_write(data) {
      if (this.file.readonly) return {
        ret: ERRNO_BADF,
        nwritten: 0
      };
      if (this.file_pos + BigInt(data.byteLength) > this.file.size) {
        var old = this.file.data;
        this.file.data = new Uint8Array(Number(this.file_pos + BigInt(data.byteLength)));
        this.file.data.set(old);
      }
      this.file.data.set(data, Number(this.file_pos));
      this.file_pos += BigInt(data.byteLength);
      return {
        ret: 0,
        nwritten: data.byteLength
      };
    }
  }, {
    key: "fd_pwrite",
    value: function fd_pwrite(data, offset) {
      if (this.file.readonly) return {
        ret: ERRNO_BADF,
        nwritten: 0
      };
      if (offset + BigInt(data.byteLength) > this.file.size) {
        var old = this.file.data;
        this.file.data = new Uint8Array(Number(offset + BigInt(data.byteLength)));
        this.file.data.set(old);
      }
      this.file.data.set(data, Number(offset));
      return {
        ret: 0,
        nwritten: data.byteLength
      };
    }
  }, {
    key: "fd_filestat_get",
    value: function fd_filestat_get() {
      return {
        ret: 0,
        filestat: this.file.stat()
      };
    }
  }]);
}(Fd);
var OpenDirectory = /*#__PURE__*/function (_Fd2) {
  function OpenDirectory(dir) {
    var _this2;
    _classCallCheck(this, OpenDirectory);
    _this2 = _callSuper(this, OpenDirectory);
    _this2.dir = dir;
    return _this2;
  }
  _inherits(OpenDirectory, _Fd2);
  return _createClass(OpenDirectory, [{
    key: "fd_seek",
    value: function fd_seek(offset, whence) {
      return {
        ret: ERRNO_BADF,
        offset: 0n
      };
    }
  }, {
    key: "fd_tell",
    value: function fd_tell() {
      return {
        ret: ERRNO_BADF,
        offset: 0n
      };
    }
  }, {
    key: "fd_allocate",
    value: function fd_allocate(offset, len) {
      return ERRNO_BADF;
    }
  }, {
    key: "fd_fdstat_get",
    value: function fd_fdstat_get() {
      return {
        ret: 0,
        fdstat: new Fdstat(FILETYPE_DIRECTORY, 0)
      };
    }
  }, {
    key: "fd_readdir_single",
    value: function fd_readdir_single(cookie) {
      if (debug.enabled) {
        debug.log("readdir_single", cookie);
        debug.log(cookie, this.dir.contents.keys());
      }
      if (cookie == 0n) {
        return {
          ret: ERRNO_SUCCESS,
          dirent: new Dirent(1n, ".", FILETYPE_DIRECTORY)
        };
      } else if (cookie == 1n) {
        return {
          ret: ERRNO_SUCCESS,
          dirent: new Dirent(2n, "..", FILETYPE_DIRECTORY)
        };
      }
      if (cookie >= BigInt(this.dir.contents.size) + 2n) {
        return {
          ret: 0,
          dirent: null
        };
      }
      var _Array$from$Number = _slicedToArray(Array.from(this.dir.contents.entries())[Number(cookie - 2n)], 2),
        name = _Array$from$Number[0],
        entry = _Array$from$Number[1];
      return {
        ret: 0,
        dirent: new Dirent(cookie + 1n, name, entry.stat().filetype)
      };
    }
  }, {
    key: "path_filestat_get",
    value: function path_filestat_get(flags, path_str) {
      var _Path$from = Path.from(path_str),
        path_err = _Path$from.ret,
        path = _Path$from.path;
      if (path == null) {
        return {
          ret: path_err,
          filestat: null
        };
      }
      var _this$dir$get_entry_f = this.dir.get_entry_for_path(path),
        ret = _this$dir$get_entry_f.ret,
        entry = _this$dir$get_entry_f.entry;
      if (entry == null) {
        return {
          ret: ret,
          filestat: null
        };
      }
      return {
        ret: 0,
        filestat: entry.stat()
      };
    }
  }, {
    key: "path_lookup",
    value: function path_lookup(path_str, dirflags) {
      var _Path$from2 = Path.from(path_str),
        path_ret = _Path$from2.ret,
        path = _Path$from2.path;
      if (path == null) {
        return {
          ret: path_ret,
          inode_obj: null
        };
      }
      var _this$dir$get_entry_f2 = this.dir.get_entry_for_path(path),
        ret = _this$dir$get_entry_f2.ret,
        entry = _this$dir$get_entry_f2.entry;
      if (entry == null) {
        return {
          ret: ret,
          inode_obj: null
        };
      }
      return {
        ret: ERRNO_SUCCESS,
        inode_obj: entry
      };
    }
  }, {
    key: "path_open",
    value: function path_open(dirflags, path_str, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
      var _Path$from3 = Path.from(path_str),
        path_ret = _Path$from3.ret,
        path = _Path$from3.path;
      if (path == null) {
        return {
          ret: path_ret,
          fd_obj: null
        };
      }
      var _this$dir$get_entry_f3 = this.dir.get_entry_for_path(path),
        ret = _this$dir$get_entry_f3.ret,
        entry = _this$dir$get_entry_f3.entry;
      if (entry == null) {
        if (ret != ERRNO_NOENT) {
          return {
            ret: ret,
            fd_obj: null
          };
        }
        if ((oflags & OFLAGS_CREAT) == OFLAGS_CREAT) {
          var _this$dir$create_entr = this.dir.create_entry_for_path(path_str, (oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY),
            _ret = _this$dir$create_entr.ret,
            new_entry = _this$dir$create_entr.entry;
          if (new_entry == null) {
            return {
              ret: _ret,
              fd_obj: null
            };
          }
          entry = new_entry;
        } else {
          return {
            ret: ERRNO_NOENT,
            fd_obj: null
          };
        }
      } else if ((oflags & OFLAGS_EXCL) == OFLAGS_EXCL) {
        return {
          ret: ERRNO_EXIST,
          fd_obj: null
        };
      }
      if ((oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY && entry.stat().filetype !== FILETYPE_DIRECTORY) {
        return {
          ret: ERRNO_NOTDIR,
          fd_obj: null
        };
      }
      return entry.path_open(oflags, fs_rights_base, fd_flags);
    }
  }, {
    key: "path_create_directory",
    value: function path_create_directory(path) {
      return this.path_open(0, path, OFLAGS_CREAT | OFLAGS_DIRECTORY, 0n, 0n, 0).ret;
    }
  }, {
    key: "path_link",
    value: function path_link(path_str, inode, allow_dir) {
      var _Path$from4 = Path.from(path_str),
        path_ret = _Path$from4.ret,
        path = _Path$from4.path;
      if (path == null) {
        return path_ret;
      }
      if (path.is_dir) {
        return ERRNO_NOENT;
      }
      var _this$dir$get_parent_ = this.dir.get_parent_dir_and_entry_for_path(path, true),
        parent_ret = _this$dir$get_parent_.ret,
        parent_entry = _this$dir$get_parent_.parent_entry,
        filename = _this$dir$get_parent_.filename,
        entry = _this$dir$get_parent_.entry;
      if (parent_entry == null || filename == null) {
        return parent_ret;
      }
      if (entry != null) {
        var source_is_dir = inode.stat().filetype == FILETYPE_DIRECTORY;
        var target_is_dir = entry.stat().filetype == FILETYPE_DIRECTORY;
        if (source_is_dir && target_is_dir) {
          if (allow_dir && entry instanceof Directory) {
            if (entry.contents.size == 0) ; else {
              return ERRNO_NOTEMPTY;
            }
          } else {
            return ERRNO_EXIST;
          }
        } else if (source_is_dir && !target_is_dir) {
          return ERRNO_NOTDIR;
        } else if (!source_is_dir && target_is_dir) {
          return ERRNO_ISDIR;
        } else if (inode.stat().filetype == FILETYPE_REGULAR_FILE && entry.stat().filetype == FILETYPE_REGULAR_FILE) ; else {
          return ERRNO_EXIST;
        }
      }
      if (!allow_dir && inode.stat().filetype == FILETYPE_DIRECTORY) {
        return ERRNO_PERM;
      }
      parent_entry.contents.set(filename, inode);
      return ERRNO_SUCCESS;
    }
  }, {
    key: "path_unlink",
    value: function path_unlink(path_str) {
      var _Path$from5 = Path.from(path_str),
        path_ret = _Path$from5.ret,
        path = _Path$from5.path;
      if (path == null) {
        return {
          ret: path_ret,
          inode_obj: null
        };
      }
      var _this$dir$get_parent_2 = this.dir.get_parent_dir_and_entry_for_path(path, true),
        parent_ret = _this$dir$get_parent_2.ret,
        parent_entry = _this$dir$get_parent_2.parent_entry,
        filename = _this$dir$get_parent_2.filename,
        entry = _this$dir$get_parent_2.entry;
      if (parent_entry == null || filename == null) {
        return {
          ret: parent_ret,
          inode_obj: null
        };
      }
      if (entry == null) {
        return {
          ret: ERRNO_NOENT,
          inode_obj: null
        };
      }
      parent_entry.contents["delete"](filename);
      return {
        ret: ERRNO_SUCCESS,
        inode_obj: entry
      };
    }
  }, {
    key: "path_unlink_file",
    value: function path_unlink_file(path_str) {
      var _Path$from6 = Path.from(path_str),
        path_ret = _Path$from6.ret,
        path = _Path$from6.path;
      if (path == null) {
        return path_ret;
      }
      var _this$dir$get_parent_3 = this.dir.get_parent_dir_and_entry_for_path(path, false),
        parent_ret = _this$dir$get_parent_3.ret,
        parent_entry = _this$dir$get_parent_3.parent_entry,
        filename = _this$dir$get_parent_3.filename,
        entry = _this$dir$get_parent_3.entry;
      if (parent_entry == null || filename == null || entry == null) {
        return parent_ret;
      }
      if (entry.stat().filetype === FILETYPE_DIRECTORY) {
        return ERRNO_ISDIR;
      }
      parent_entry.contents["delete"](filename);
      return ERRNO_SUCCESS;
    }
  }, {
    key: "path_remove_directory",
    value: function path_remove_directory(path_str) {
      var _Path$from7 = Path.from(path_str),
        path_ret = _Path$from7.ret,
        path = _Path$from7.path;
      if (path == null) {
        return path_ret;
      }
      var _this$dir$get_parent_4 = this.dir.get_parent_dir_and_entry_for_path(path, false),
        parent_ret = _this$dir$get_parent_4.ret,
        parent_entry = _this$dir$get_parent_4.parent_entry,
        filename = _this$dir$get_parent_4.filename,
        entry = _this$dir$get_parent_4.entry;
      if (parent_entry == null || filename == null || entry == null) {
        return parent_ret;
      }
      if (!(entry instanceof Directory) || entry.stat().filetype !== FILETYPE_DIRECTORY) {
        return ERRNO_NOTDIR;
      }
      if (entry.contents.size !== 0) {
        return ERRNO_NOTEMPTY;
      }
      if (!parent_entry.contents["delete"](filename)) {
        return ERRNO_NOENT;
      }
      return ERRNO_SUCCESS;
    }
  }, {
    key: "fd_filestat_get",
    value: function fd_filestat_get() {
      return {
        ret: 0,
        filestat: this.dir.stat()
      };
    }
  }, {
    key: "fd_filestat_set_size",
    value: function fd_filestat_set_size(size) {
      return ERRNO_BADF;
    }
  }, {
    key: "fd_read",
    value: function fd_read(size) {
      return {
        ret: ERRNO_BADF,
        data: new Uint8Array()
      };
    }
  }, {
    key: "fd_pread",
    value: function fd_pread(size, offset) {
      return {
        ret: ERRNO_BADF,
        data: new Uint8Array()
      };
    }
  }, {
    key: "fd_write",
    value: function fd_write(data) {
      return {
        ret: ERRNO_BADF,
        nwritten: 0
      };
    }
  }, {
    key: "fd_pwrite",
    value: function fd_pwrite(data, offset) {
      return {
        ret: ERRNO_BADF,
        nwritten: 0
      };
    }
  }]);
}(Fd);
var PreopenDirectory = /*#__PURE__*/function (_OpenDirectory) {
  function PreopenDirectory(name, contents) {
    var _this3;
    _classCallCheck(this, PreopenDirectory);
    _this3 = _callSuper(this, PreopenDirectory, [new Directory(contents)]);
    _this3.prestat_name = name;
    return _this3;
  }
  _inherits(PreopenDirectory, _OpenDirectory);
  return _createClass(PreopenDirectory, [{
    key: "fd_prestat_get",
    value: function fd_prestat_get() {
      return {
        ret: 0,
        prestat: Prestat.dir(this.prestat_name)
      };
    }
  }]);
}(OpenDirectory);
var File = /*#__PURE__*/function (_Inode) {
  function File(data, options) {
    var _this4;
    _classCallCheck(this, File);
    _this4 = _callSuper(this, File);
    _this4.data = new Uint8Array(data);
    _this4.readonly = !!(options !== null && options !== void 0 && options.readonly);
    return _this4;
  }
  _inherits(File, _Inode);
  return _createClass(File, [{
    key: "path_open",
    value: function path_open(oflags, fs_rights_base, fd_flags) {
      if (this.readonly && (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)) {
        return {
          ret: ERRNO_PERM,
          fd_obj: null
        };
      }
      if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
        if (this.readonly) return {
          ret: ERRNO_PERM,
          fd_obj: null
        };
        this.data = new Uint8Array([]);
      }
      var file = new OpenFile(this);
      if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
      return {
        ret: ERRNO_SUCCESS,
        fd_obj: file
      };
    }
  }, {
    key: "size",
    get: function get() {
      return BigInt(this.data.byteLength);
    }
  }, {
    key: "stat",
    value: function stat() {
      return new Filestat(FILETYPE_REGULAR_FILE, this.size);
    }
  }]);
}(Inode);
var Path = /*#__PURE__*/function () {
  function Path() {
    _classCallCheck(this, Path);
    this.parts = [];
    this.is_dir = false;
  }
  return _createClass(Path, [{
    key: "to_path_string",
    value: function to_path_string() {
      var s = this.parts.join("/");
      if (this.is_dir) {
        s += "/";
      }
      return s;
    }
  }], [{
    key: "from",
    value: function from(path) {
      var self = new Path();
      self.is_dir = path.endsWith("/");
      if (path.startsWith("/")) {
        return {
          ret: ERRNO_NOTCAPABLE,
          path: null
        };
      }
      if (path.includes("\x00")) {
        return {
          ret: ERRNO_INVAL,
          path: null
        };
      }
      var _iterator = _createForOfIteratorHelper(path.split("/")),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var component = _step.value;
          if (component === "" || component === ".") {
            continue;
          }
          if (component === "..") {
            if (self.parts.pop() == undefined) {
              return {
                ret: ERRNO_NOTCAPABLE,
                path: null
              };
            }
            continue;
          }
          self.parts.push(component);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        ret: ERRNO_SUCCESS,
        path: self
      };
    }
  }]);
}();
var Directory = /*#__PURE__*/function (_Inode2) {
  function Directory(contents) {
    var _this5;
    _classCallCheck(this, Directory);
    _this5 = _callSuper(this, Directory);
    if (contents instanceof Array) {
      _this5.contents = new Map(contents);
    } else {
      _this5.contents = contents;
    }
    return _this5;
  }
  _inherits(Directory, _Inode2);
  return _createClass(Directory, [{
    key: "path_open",
    value: function path_open(oflags, fs_rights_base, fd_flags) {
      return {
        ret: ERRNO_SUCCESS,
        fd_obj: new OpenDirectory(this)
      };
    }
  }, {
    key: "stat",
    value: function stat() {
      return new Filestat(FILETYPE_DIRECTORY, 0n);
    }
  }, {
    key: "get_entry_for_path",
    value: function get_entry_for_path(path) {
      var entry = this;
      var _iterator2 = _createForOfIteratorHelper(path.parts),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var component = _step2.value;
          if (!(entry instanceof Directory)) {
            return {
              ret: ERRNO_NOTDIR,
              entry: null
            };
          }
          var child = entry.contents.get(component);
          if (child !== undefined) {
            entry = child;
          } else {
            debug.log(component);
            return {
              ret: ERRNO_NOENT,
              entry: null
            };
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (path.is_dir) {
        if (entry.stat().filetype != FILETYPE_DIRECTORY) {
          return {
            ret: ERRNO_NOTDIR,
            entry: null
          };
        }
      }
      return {
        ret: ERRNO_SUCCESS,
        entry: entry
      };
    }
  }, {
    key: "get_parent_dir_and_entry_for_path",
    value: function get_parent_dir_and_entry_for_path(path, allow_undefined) {
      var filename = path.parts.pop();
      if (filename === undefined) {
        return {
          ret: ERRNO_INVAL,
          parent_entry: null,
          filename: null,
          entry: null
        };
      }
      var _this$get_entry_for_p = this.get_entry_for_path(path),
        entry_ret = _this$get_entry_for_p.ret,
        parent_entry = _this$get_entry_for_p.entry;
      if (parent_entry == null) {
        return {
          ret: entry_ret,
          parent_entry: null,
          filename: null,
          entry: null
        };
      }
      if (!(parent_entry instanceof Directory)) {
        return {
          ret: ERRNO_NOTDIR,
          parent_entry: null,
          filename: null,
          entry: null
        };
      }
      var entry = parent_entry.contents.get(filename);
      if (entry === undefined) {
        if (!allow_undefined) {
          return {
            ret: ERRNO_NOENT,
            parent_entry: null,
            filename: null,
            entry: null
          };
        } else {
          return {
            ret: ERRNO_SUCCESS,
            parent_entry: parent_entry,
            filename: filename,
            entry: null
          };
        }
      }
      if (path.is_dir) {
        if (entry.stat().filetype != FILETYPE_DIRECTORY) {
          return {
            ret: ERRNO_NOTDIR,
            parent_entry: null,
            filename: null,
            entry: null
          };
        }
      }
      return {
        ret: ERRNO_SUCCESS,
        parent_entry: parent_entry,
        filename: filename,
        entry: entry
      };
    }
  }, {
    key: "create_entry_for_path",
    value: function create_entry_for_path(path_str, is_dir) {
      var _Path$from8 = Path.from(path_str),
        path_ret = _Path$from8.ret,
        path = _Path$from8.path;
      if (path == null) {
        return {
          ret: path_ret,
          entry: null
        };
      }
      var _this$get_parent_dir_ = this.get_parent_dir_and_entry_for_path(path, true),
        parent_ret = _this$get_parent_dir_.ret,
        parent_entry = _this$get_parent_dir_.parent_entry,
        filename = _this$get_parent_dir_.filename,
        entry = _this$get_parent_dir_.entry;
      if (parent_entry == null || filename == null) {
        return {
          ret: parent_ret,
          entry: null
        };
      }
      if (entry != null) {
        return {
          ret: ERRNO_EXIST,
          entry: null
        };
      }
      debug.log("create", path);
      var new_child;
      if (!is_dir) {
        new_child = new File(new ArrayBuffer(0));
      } else {
        new_child = new Directory(new Map());
      }
      parent_entry.contents.set(filename, new_child);
      entry = new_child;
      return {
        ret: ERRNO_SUCCESS,
        entry: entry
      };
    }
  }]);
}(Inode);
var ConsoleStdout = /*#__PURE__*/function (_Fd3) {
  function ConsoleStdout(write) {
    var _this6;
    _classCallCheck(this, ConsoleStdout);
    _this6 = _callSuper(this, ConsoleStdout);
    _this6.write = write;
    return _this6;
  }
  _inherits(ConsoleStdout, _Fd3);
  return _createClass(ConsoleStdout, [{
    key: "fd_filestat_get",
    value: function fd_filestat_get() {
      var filestat = new Filestat(FILETYPE_CHARACTER_DEVICE, BigInt(0));
      return {
        ret: 0,
        filestat: filestat
      };
    }
  }, {
    key: "fd_fdstat_get",
    value: function fd_fdstat_get() {
      var fdstat = new Fdstat(FILETYPE_CHARACTER_DEVICE, 0);
      fdstat.fs_rights_base = BigInt(RIGHTS_FD_WRITE);
      return {
        ret: 0,
        fdstat: fdstat
      };
    }
  }, {
    key: "fd_write",
    value: function fd_write(data) {
      this.write(data);
      return {
        ret: 0,
        nwritten: data.byteLength
      };
    }
  }], [{
    key: "lineBuffered",
    value: function lineBuffered(write) {
      var dec = new TextDecoder("utf-8", {
        fatal: false
      });
      var line_buf = "";
      return new ConsoleStdout(function (buffer) {
        line_buf += dec.decode(buffer, {
          stream: true
        });
        var lines = line_buf.split("\n");
        var _iterator3 = _createForOfIteratorHelper(lines.entries()),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _slicedToArray(_step3.value, 2),
              i = _step3$value[0],
              line = _step3$value[1];
            if (i < lines.length - 1) {
              write(line);
            } else {
              line_buf = line;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
  }]);
}(Fd);

var SyncOPFSFile = /*#__PURE__*/function (_Inode) {
  function SyncOPFSFile(handle, options) {
    var _this;
    _classCallCheck(this, SyncOPFSFile);
    _this = _callSuper(this, SyncOPFSFile);
    _this.handle = handle;
    _this.readonly = !!(options !== null && options !== void 0 && options.readonly);
    return _this;
  }
  _inherits(SyncOPFSFile, _Inode);
  return _createClass(SyncOPFSFile, [{
    key: "path_open",
    value: function path_open(oflags, fs_rights_base, fd_flags) {
      if (this.readonly && (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)) {
        return {
          ret: ERRNO_PERM,
          fd_obj: null
        };
      }
      if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
        if (this.readonly) return {
          ret: ERRNO_PERM,
          fd_obj: null
        };
        this.handle.truncate(0);
      }
      var file = new OpenSyncOPFSFile(this);
      if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
      return {
        ret: ERRNO_SUCCESS,
        fd_obj: file
      };
    }
  }, {
    key: "size",
    get: function get() {
      return BigInt(this.handle.getSize());
    }
  }, {
    key: "stat",
    value: function stat() {
      return new Filestat(FILETYPE_REGULAR_FILE, this.size);
    }
  }]);
}(Inode);
var OpenSyncOPFSFile = /*#__PURE__*/function (_Fd) {
  function OpenSyncOPFSFile(file) {
    var _this2;
    _classCallCheck(this, OpenSyncOPFSFile);
    _this2 = _callSuper(this, OpenSyncOPFSFile);
    _this2.position = 0n;
    _this2.file = file;
    return _this2;
  }
  _inherits(OpenSyncOPFSFile, _Fd);
  return _createClass(OpenSyncOPFSFile, [{
    key: "fd_allocate",
    value: function fd_allocate(offset, len) {
      if (BigInt(this.file.handle.getSize()) > offset + len) ; else {
        this.file.handle.truncate(Number(offset + len));
      }
      return ERRNO_SUCCESS;
    }
  }, {
    key: "fd_fdstat_get",
    value: function fd_fdstat_get() {
      return {
        ret: 0,
        fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0)
      };
    }
  }, {
    key: "fd_filestat_get",
    value: function fd_filestat_get() {
      return {
        ret: 0,
        filestat: new Filestat(FILETYPE_REGULAR_FILE, BigInt(this.file.handle.getSize()))
      };
    }
  }, {
    key: "fd_filestat_set_size",
    value: function fd_filestat_set_size(size) {
      this.file.handle.truncate(Number(size));
      return ERRNO_SUCCESS;
    }
  }, {
    key: "fd_read",
    value: function fd_read(size) {
      var buf = new Uint8Array(size);
      var n = this.file.handle.read(buf, {
        at: Number(this.position)
      });
      this.position += BigInt(n);
      return {
        ret: 0,
        data: buf.slice(0, n)
      };
    }
  }, {
    key: "fd_seek",
    value: function fd_seek(offset, whence) {
      var calculated_offset;
      switch (whence) {
        case WHENCE_SET:
          calculated_offset = BigInt(offset);
          break;
        case WHENCE_CUR:
          calculated_offset = this.position + BigInt(offset);
          break;
        case WHENCE_END:
          calculated_offset = BigInt(this.file.handle.getSize()) + BigInt(offset);
          break;
        default:
          return {
            ret: ERRNO_INVAL,
            offset: 0n
          };
      }
      if (calculated_offset < 0) {
        return {
          ret: ERRNO_INVAL,
          offset: 0n
        };
      }
      this.position = calculated_offset;
      return {
        ret: ERRNO_SUCCESS,
        offset: this.position
      };
    }
  }, {
    key: "fd_write",
    value: function fd_write(data) {
      if (this.file.readonly) return {
        ret: ERRNO_BADF,
        nwritten: 0
      };
      var n = this.file.handle.write(data, {
        at: Number(this.position)
      });
      this.position += BigInt(n);
      return {
        ret: ERRNO_SUCCESS,
        nwritten: n
      };
    }
  }, {
    key: "fd_sync",
    value: function fd_sync() {
      this.file.handle.flush();
      return ERRNO_SUCCESS;
    }
  }]);
}(Fd);

function strace(imports, no_trace) {
  return new Proxy(imports, {
    get: function get(target, prop, receiver) {
      var f = Reflect.get(target, prop, receiver);
      if (no_trace.includes(prop)) {
        return f;
      }
      return function () {
        var _console;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_console = console).log.apply(_console, [prop, "("].concat(args, [")"]));
        var result = Reflect.apply(f, receiver, args);
        console.log(" =", result);
        return result;
      };
    }
  });
}

export { ConsoleStdout, Directory, Fd, File, Inode, OpenDirectory, OpenFile, OpenSyncOPFSFile, PreopenDirectory, SyncOPFSFile, WASI, WASIProcExit, strace, wasi_defs as wasi };
