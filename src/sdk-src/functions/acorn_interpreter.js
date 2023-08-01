"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* eslint-disable */
/**
 * Copied from source: https://github.com/NeilFraser/JS-Interpreter/blob/master/acorn_interpreter.js
 */
/*

 Copyright 2012 Marijn Haverbeke
 SPDX-License-Identifier: MIT
*/
var p;
var ca = function (a) {
    function b(f) {
        return 48 > f ? 36 === f : 58 > f ? !0 : 65 > f ? !1 : 91 > f ? !0 : 97 > f ? 95 === f : 123 > f ? !0 : 170 <= f && Gc.test(String.fromCharCode(f));
    }
    function d(f) {
        return 65 > f ? 36 === f : 91 > f ? !0 : 97 > f ? 95 === f : 123 > f ? !0 : 170 <= f && Pb.test(String.fromCharCode(f));
    }
    function c(f, g) {
        var k = r;
        for (var n = 1, w = 0;;) {
            Sa.lastIndex = w;
            var J = Sa.exec(k);
            if (J && J.index < f)
                ++n, w = J.index + J[0].length;
            else
                break;
        }
        k = {
            line: n,
            Za: f - w
        };
        g += " (" + k.line + ":" + k.Za + ")";
        g = new SyntaxError(g);
        g.j = f;
        g.V = k;
        g.o = m;
        throw g;
    }
    function e(f) {
        f = f.split(" ");
        for (var g = Object.create(null), k = 0; k < f.length; k++)
            g[f[k]] = !0;
        return function (n) {
            return g[n] || !1;
        };
    }
    function h() {
        this.line = la;
        this.Za = m - X;
    }
    function l(f, g) {
        oa = m;
        z.B && (bb = new h());
        x = f;
        C();
        T = g;
        xa = f.m;
    }
    function q() {
        for (var f = m, g = z.ua && z.B && new h(), k = r.charCodeAt(m += 2); m < pa && 10 !== k && 13 !== k && 8232 !== k && 8233 !== k;)
            ++m, k = r.charCodeAt(m);
        z.ua && z.ua(!1, r.slice(f + 2, m), f, m, g, z.B && new h());
    }
    function C() {
        for (; m < pa;) {
            var f = r.charCodeAt(m);
            if (32 === f)
                ++m;
            else if (13 === f)
                ++m, f = r.charCodeAt(m), 10 === f && ++m, z.B && (++la, X = m);
            else if (10 === f || 8232 === f || 8233 === f)
                ++m, z.B && (++la, X = m);
            else if (8 < f && 14 > f)
                ++m;
            else if (47 === f) {
                if (f = r.charCodeAt(m + 1), 42 === f) {
                    f = void 0;
                    var g = z.ua && z.B && new h(), k = m, n = r.indexOf("*/", m += 2);
                    -1 === n && c(m - 2, "Unterminated comment");
                    m = n + 2;
                    if (z.B)
                        for (Sa.lastIndex = k; (f = Sa.exec(r)) && f.index < m;)
                            ++la, X = f.index + f[0].length;
                    z.ua && z.ua(!0, r.slice(k + 2, n), k, m, g, z.B && new h());
                }
                else if (47 === f)
                    q();
                else
                    break;
            }
            else if (160 === f)
                ++m;
            else if (5760 <= f && Hc.test(String.fromCharCode(f)))
                ++m;
            else
                break;
        }
    }
    function V(f) {
        switch (f) {
            case 46:
                f = r.charCodeAt(m + 1);
                48 <= f && 57 >= f ? Qb(!0) : (++m, l(Rb));
                return;
            case 40:
                return ++m, l(Y);
            case 41:
                return ++m, l(W);
            case 59:
                return ++m, l(Z);
            case 44:
                return ++m, l(ha);
            case 91:
                return ++m, l(cb);
            case 93:
                return ++m, l(db);
            case 123:
                return ++m, l(ya);
            case 125:
                return ++m, l(qa);
            case 58:
                return ++m, l(za);
            case 63:
                return ++m, l(Sb);
            case 48:
                if (f = r.charCodeAt(m + 1), 120 === f || 88 === f) {
                    m += 2;
                    f = Aa(16);
                    null === f && c(I + 2, "Expected hexadecimal number");
                    d(r.charCodeAt(m)) && c(m, "Identifier directly after number");
                    l(Ba, f);
                    return;
                }
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return Qb(!1);
            case 34:
            case 39:
                m++;
                for (var g = "";;) {
                    m >= pa && c(I, "Unterminated string constant");
                    var k = r.charCodeAt(m);
                    if (k === f) {
                        ++m;
                        l(Ta, g);
                        break;
                    }
                    if (92 === k) {
                        k = r.charCodeAt(++m);
                        var n = /^[0-7]+/.exec(r.slice(m, m + 3));
                        for (n && (n = n[0]); n && 255 < parseInt(n, 8);)
                            n = n.slice(0, -1);
                        "0" === n && (n = null);
                        ++m;
                        if (n)
                            S && c(m - 2, "Octal literal in strict mode"), g += String.fromCharCode(parseInt(n, 8)), m += n.length - 1;
                        else
                            switch (k) {
                                case 110:
                                    g += "\n";
                                    break;
                                case 114:
                                    g += "\r";
                                    break;
                                case 120:
                                    g += String.fromCharCode(Ua(2));
                                    break;
                                case 117:
                                    g += String.fromCharCode(Ua(4));
                                    break;
                                case 85:
                                    g += String.fromCharCode(Ua(8));
                                    break;
                                case 116:
                                    g += "\t";
                                    break;
                                case 98:
                                    g += "\b";
                                    break;
                                case 118:
                                    g += "\v";
                                    break;
                                case 102:
                                    g += "\f";
                                    break;
                                case 48:
                                    g += "\x00";
                                    break;
                                case 13:
                                    10 === r.charCodeAt(m) && ++m;
                                case 10:
                                    z.B && (X = m, ++la);
                                    break;
                                default:
                                    g += String.fromCharCode(k);
                            }
                    }
                    else
                        13 !== k && 10 !== k && 8232 !== k && 8233 !== k || c(I, "Unterminated string constant"), g += String.fromCharCode(k), ++m;
                }
                return;
            case 47:
                f = r.charCodeAt(m + 1);
                xa ? (++m, Tb()) : 61 === f ? F(ma, 2) : F(Ub, 1);
                return;
            case 37:
            case 42:
                61 === r.charCodeAt(m + 1) ? F(ma, 2) : F(Ic, 1);
                return;
            case 124:
            case 38:
                g = r.charCodeAt(m + 1);
                g === f ? F(124 === f ? Vb : Wb, 2) : 61 === g ? F(ma, 2) : F(124 === f ? Jc : Kc, 1);
                return;
            case 94:
                61 === r.charCodeAt(m + 1) ? F(ma, 2) : F(Lc, 1);
                return;
            case 43:
            case 45:
                g = r.charCodeAt(m + 1);
                g === f ? 45 === g && 62 === r.charCodeAt(m + 2) && Va.test(r.slice(ia, m)) ? (m += 3, q(), C(), N()) : F(Mc, 2) : 61 === g ? F(ma, 2) : F(Nc, 1);
                return;
            case 60:
            case 62:
                g = r.charCodeAt(m + 1);
                k = 1;
                g === f ? (k = 62 === f && 62 === r.charCodeAt(m + 2) ? 3 : 2, 61 === r.charCodeAt(m + k) ? F(ma, k + 1) : F(Oc, k)) : 33 === g && 60 === f && 45 === r.charCodeAt(m + 2) && 45 === r.charCodeAt(m + 3) ? (m += 4, q(), C(), N()) : (61 === g && (k = 61 === r.charCodeAt(m + 2) ? 3 : 2), F(Pc, k));
                return;
            case 61:
            case 33:
                61 === r.charCodeAt(m + 1) ? F(Qc, 61 === r.charCodeAt(m + 2) ? 3 : 2) : F(61 === f ? Xb : Yb, 1);
                return;
            case 126:
                return F(Yb, 1);
        }
        return !1;
    }
    function N(f) {
        f ? m = I + 1 : I = m;
        z.B && (eb = new h());
        if (f)
            return Tb();
        if (m >= pa)
            return l(fb);
        f = r.charCodeAt(m);
        if (d(f) || 92 === f)
            return Zb();
        if (!1 === V(f)) {
            f = String.fromCharCode(f);
            if ("\\" === f || Pb.test(f))
                return Zb();
            c(m, "Unexpected character '" + f + "'");
        }
    }
    function F(f, g) {
        var k = r.slice(m, m + g);
        m += g;
        l(f, k);
    }
    function Tb() {
        for (var f, g, k = m;;) {
            m >= pa && c(k, "Unterminated regexp");
            var n = r.charAt(m);
            Va.test(n) && c(k, "Unterminated regexp");
            if (f)
                f = !1;
            else {
                if ("[" === n)
                    g = !0;
                else if ("]" === n && g)
                    g = !1;
                else if ("/" === n && !g)
                    break;
                f = "\\" === n;
            }
            ++m;
        }
        f = r.slice(k, m);
        ++m;
        (g = $b()) && !/^[gmi]*$/.test(g) && c(k, "Invalid regexp flag");
        try {
            var w = new RegExp(f, g);
        }
        catch (J) {
            throw J instanceof SyntaxError && c(k, J.message), J;
        }
        l(ac, w);
    }
    function Aa(f, g) {
        for (var k = m, n = 0, w = void 0 === g ? Infinity : g, J = 0; J < w; ++J) {
            var P = r.charCodeAt(m);
            P = 97 <= P ? P - 97 + 10 : 65 <= P ? P - 65 + 10 : 48 <= P && 57 >= P ? P - 48 : Infinity;
            if (P >= f)
                break;
            ++m;
            n = n * f + P;
        }
        return m === k || void 0 !== g && m - k !== g ? null : n;
    }
    function Qb(f) {
        var g = m, k = !1, n = 48 === r.charCodeAt(m);
        f || null !== Aa(10) || c(g, "Invalid number");
        46 === r.charCodeAt(m) && (++m, Aa(10), k = !0);
        f = r.charCodeAt(m);
        if (69 === f || 101 === f)
            f = r.charCodeAt(++m), 43 !== f && 45 !== f || ++m, null === Aa(10) && c(g, "Invalid number"), k = !0;
        d(r.charCodeAt(m)) && c(m, "Identifier directly after number");
        f = r.slice(g, m);
        var w;
        k ? w = parseFloat(f) : n && 1 !== f.length ? /[89]/.test(f) || S ? c(g, "Invalid number") : w = parseInt(f, 8) : w = parseInt(f, 10);
        l(Ba, w);
    }
    function Ua(f) {
        f = Aa(16, f);
        null === f && c(I, "Bad character escape sequence");
        return f;
    }
    function $b() {
        ra = !1;
        for (var f, g = !0, k = m;;) {
            var n = r.charCodeAt(m);
            if (b(n))
                ra && (f += r.charAt(m)), ++m;
            else if (92 === n) {
                ra || (f = r.slice(k, m));
                ra = !0;
                117 !== r.charCodeAt(++m) && c(m, "Expecting Unicode escape sequence \\uXXXX");
                ++m;
                n = Ua(4);
                var w = String.fromCharCode(n);
                w || c(m - 1, "Invalid Unicode escape");
                (g ? d(n) : b(n)) || c(m - 4, "Invalid Unicode escape");
                f += w;
            }
            else
                break;
            g = !1;
        }
        return ra ? f : r.slice(k, m);
    }
    function Zb() {
        var f = $b(), g = sa;
        !ra && Rc(f) && (g = Sc[f]);
        l(g, f);
    }
    function A() {
        gb = I;
        ia = oa;
        hb = bb;
        N();
    }
    function ib(f) {
        S = f;
        m = I;
        if (z.B)
            for (; m < X;)
                X = r.lastIndexOf("\n", X - 2) + 1, --la;
        C();
        N();
    }
    function bc() {
        this.type = null;
        this.start = I;
        this.end = null;
    }
    function cc() {
        this.start = eb;
        this.end = null;
        jb && (this.source = jb);
    }
    function L() {
        var f = new bc();
        z.B && (f.V = new cc());
        z.ub && (f.sourceFile = z.ub);
        z.Ua && (f.j = [I, 0]);
        return f;
    }
    function ja(f) {
        var g = new bc();
        g.start = f.start;
        z.B && (g.V = new cc(), g.V.start = f.V.start);
        z.Ua && (g.j = [f.j[0], 0]);
        return g;
    }
    function y(f, g) {
        f.type = g;
        f.end = ia;
        z.B && (f.V.end = hb);
        z.Ua && (f.j[1] = ia);
        return f;
    }
    function kb(f) {
        return "ExpressionStatement" === f.type && "Literal" === f.ja.type && "use strict" === f.ja.value;
    }
    function E(f) {
        return x === f ? (A(), !0) : !1;
    }
    function Wa() {
        return !z.bc && (x === fb || x === qa || Va.test(r.slice(ia, I)));
    }
    function na() {
        E(Z) || Wa() || aa();
    }
    function G(f) {
        x === f ? A() : aa();
    }
    function aa() {
        c(I, "Unexpected token");
    }
    function Xa(f) {
        "Identifier" !== f.type && "MemberExpression" !== f.type && c(f.start, "Assigning to rvalue");
        S && "Identifier" === f.type && Ya(f.name) && c(f.start, "Assigning to " + f.name + " in strict mode");
    }
    function U() {
        (x === Ub || x === ma && "/=" === T) && N(!0);
        var f = x, g = L();
        switch (f) {
            case lb:
            case dc:
                A();
                var k = f === lb;
                E(Z) || Wa() ? g.label = null : x !== sa ? aa() : (g.label = ba(), na());
                for (var n = 0; n < H.length; ++n) {
                    var w = H[n];
                    if (null === g.label || w.name === g.label.name) {
                        if (null !== w.kind && (k || "loop" === w.kind))
                            break;
                        if (g.label && k)
                            break;
                    }
                }
                n === H.length && c(g.start, "Unsyntactic " + f.l);
                return y(g, k ? "BreakStatement" : "ContinueStatement");
            case ec:
                return A(), na(), y(g, "DebuggerStatement");
            case fc:
                return A(), H.push(mb), g.body = U(), H.pop(), G(nb), g.test = Ca(), na(), y(g, "DoWhileStatement");
            case gc:
                A();
                H.push(mb);
                G(Y);
                if (x === Z)
                    return ob(g, null);
                if (x === pb)
                    return f = L(), A(), hc(f, !0), y(f, "VariableDeclaration"), 1 === f.da.length && E(Za) ? ic(g, f) : ob(g, f);
                f = O(!1, !0);
                return E(Za) ? (Xa(f), ic(g, f)) : ob(g, f);
            case qb:
                return A(), rb(g, !0);
            case jc:
                return A(), g.test = Ca(), g.ba = U(), g.alternate = E(kc) ? U() : null, y(g, "IfStatement");
            case lc:
                return Da || z.Fb || c(I, "'return' outside of function"), A(), E(Z) || Wa() ? g.J = null : (g.J = O(), na()), y(g, "ReturnStatement");
            case sb:
                A();
                g.Mb = Ca();
                g.sb = [];
                G(ya);
                for (H.push(Tc); x !== qa;)
                    x === tb || x === mc ? (f = x === tb, n && y(n, "SwitchCase"), g.sb.push(n = L()), n.ba = [], A(), f ? n.test = O() : (k && c(gb, "Multiple default clauses"), k = !0, n.test = null), G(za)) : (n || aa(), n.ba.push(U()));
                n && y(n, "SwitchCase");
                A();
                H.pop();
                return y(g, "SwitchStatement");
            case nc:
                return A(), Va.test(r.slice(ia, I)) && c(ia, "Illegal newline after throw"), g.J = O(), na(), y(g, "ThrowStatement");
            case oc:
                return A(), g.block = Ea(), g.Ca = null, x === pc && (f = L(), A(), G(Y), f.Ra = ba(), S && Ya(f.Ra.name) && c(f.Ra.start, "Binding " + f.Ra.name + " in strict mode"), G(W), f.body = Ea(), g.Ca = y(f, "CatchClause")), g.eb = E(qc) ? Ea() : null, g.Ca || g.eb || c(g.start, "Missing catch or finally clause"), y(g, "TryStatement");
            case pb:
                return A(), hc(g), na(), y(g, "VariableDeclaration");
            case nb:
                return A(), g.test = Ca(), H.push(mb), g.body = U(), H.pop(), y(g, "WhileStatement");
            case rc:
                return S && c(I, "'with' in strict mode"), A(), g.object = Ca(), g.body = U(), y(g, "WithStatement");
            case ya:
                return Ea();
            case Z:
                return A(), y(g, "EmptyStatement");
            default:
                k = T;
                w = O();
                if (f === sa && "Identifier" === w.type && E(za)) {
                    for (n = 0; n < H.length; ++n)
                        H[n].name === k && c(w.start, "Label '" + k + "' is already declared");
                    H.push({
                        name: k,
                        kind: x.U ? "loop" : x === sb ? "switch" : null
                    });
                    g.body = U();
                    H.pop();
                    g.label = w;
                    return y(g, "LabeledStatement");
                }
                g.ja = w;
                na();
                return y(g, "ExpressionStatement");
        }
    }
    function Ca() {
        G(Y);
        var f = O();
        G(W);
        return f;
    }
    function Ea(f) {
        var g = L(), k = !0, n = !1;
        g.body = [];
        for (G(ya); !E(qa);) {
            var w = U();
            g.body.push(w);
            if (k && f && kb(w)) {
                var J = n;
                ib(n = !0);
            }
            k = !1;
        }
        n && !J && ib(!1);
        return y(g, "BlockStatement");
    }
    function ob(f, g) {
        f.ta = g;
        G(Z);
        f.test = x === Z ? null : O();
        G(Z);
        f.update = x === W ? null : O();
        G(W);
        f.body = U();
        H.pop();
        return y(f, "ForStatement");
    }
    function ic(f, g) {
        f.left = g;
        f.right = O();
        G(W);
        f.body = U();
        H.pop();
        return y(f, "ForInStatement");
    }
    function hc(f, g) {
        f.da = [];
        for (f.kind = "var";;) {
            var k = L();
            k.id = ba();
            S && Ya(k.id.name) && c(k.id.start, "Binding " + k.id.name + " in strict mode");
            k.ta = E(Xb) ? O(!0, g) : null;
            f.da.push(y(k, "VariableDeclarator"));
            if (!E(ha))
                break;
        }
    }
    function O(f, g) {
        var k = ub(g);
        if (!f && x === ha) {
            f = ja(k);
            for (f.wb = [k]; E(ha);)
                f.wb.push(ub(g));
            return y(f, "SequenceExpression");
        }
        return k;
    }
    function ub(f) {
        var g = vb(wb(), -1, f);
        if (E(Sb)) {
            var k = ja(g);
            k.test = g;
            k.ba = O(!0);
            G(za);
            k.alternate = O(!0, f);
            g = y(k, "ConditionalExpression");
        }
        return x.Ab ? (k = ja(g), k.operator = T, k.left = g, A(), k.right = ub(f), Xa(g), y(k, "AssignmentExpression")) : g;
    }
    function vb(f, g, k) {
        var n = x.K;
        if (null !== n && (!k || x !== Za) && n > g) {
            var w = ja(f);
            w.left = f;
            w.operator = T;
            f = x;
            A();
            w.right = vb(wb(), n, k);
            n = y(w, f === Vb || f === Wb ? "LogicalExpression" : "BinaryExpression");
            return vb(n, g, k);
        }
        return f;
    }
    function wb() {
        if (x.prefix) {
            var f = L(), g = x.Wb;
            f.operator = T;
            xa = f.prefix = !0;
            A();
            f.J = wb();
            g ? Xa(f.J) : S && "delete" === f.operator && "Identifier" === f.J.type && c(f.start, "Deleting local variable in strict mode");
            return y(f, g ? "UpdateExpression" : "UnaryExpression");
        }
        for (g = Fa($a()); x.Zb && !Wa();)
            f = ja(g), f.operator = T, f.prefix = !1, f.J = g, Xa(g), A(), g = y(f, "UpdateExpression");
        return g;
    }
    function Fa(f, g) {
        if (E(Rb)) {
            var k = ja(f);
            k.object = f;
            k.Ta = ba(!0);
            k.$a = !1;
            return Fa(y(k, "MemberExpression"), g);
        }
        return E(cb) ? (k = ja(f), k.object = f, k.Ta = O(), k.$a = !0, G(db), Fa(y(k, "MemberExpression"), g)) : !g && E(Y) ? (k = ja(f), k.callee = f, k.arguments = xb(W, !1), Fa(y(k, "CallExpression"), g)) : f;
    }
    function $a() {
        switch (x) {
            case sc:
                var f = L();
                A();
                return y(f, "ThisExpression");
            case sa:
                return ba();
            case Ba:
            case Ta:
            case ac:
                return f = L(), f.value = T, f.raw = r.slice(I, oa), A(), y(f, "Literal");
            case tc:
            case uc:
            case vc:
                return f = L(), f.value = x.Ya, f.raw = x.l, A(), y(f, "Literal");
            case Y:
                f = eb;
                var g = I;
                A();
                var k = O();
                k.start = g;
                k.end = oa;
                z.B && (k.V.start = f, k.V.end = bb);
                z.Ua && (k.j = [g, oa]);
                G(W);
                return k;
            case cb:
                return f = L(), A(), f.elements = xb(db, !0, !0), y(f, "ArrayExpression");
            case ya:
                f = L();
                g = !0;
                k = !1;
                f.h = [];
                for (A(); !E(qa);) {
                    if (g)
                        g = !1;
                    else if (G(ha), z.rb && E(qa))
                        break;
                    var n = {
                        key: x === Ba || x === Ta ? $a() : ba(!0)
                    }, w = !1;
                    if (E(za)) {
                        n.value = O(!0);
                        var J = n.kind = "init";
                    }
                    else
                        "Identifier" !== n.key.type || "get" !== n.key.name && "set" !== n.key.name ? aa() : (w = k = !0, J = n.kind = n.key.name, n.key = x === Ba || x === Ta ? $a() : ba(!0), x !== Y && aa(), n.value = rb(L(), !1));
                    if ("Identifier" === n.key.type && (S || k))
                        for (var P = 0; P < f.h.length; ++P) {
                            var ta = f.h[P];
                            if (ta.key.name === n.key.name) {
                                var yb = J === ta.kind || w && "init" === ta.kind || "init" === J && ("get" === ta.kind || "set" === ta.kind);
                                yb && !S && "init" === J && "init" === ta.kind && (yb = !1);
                                yb && c(n.key.start, "Redefinition of property");
                            }
                        }
                    f.h.push(n);
                }
                return y(f, "ObjectExpression");
            case qb:
                return f = L(), A(), rb(f, !1);
            case wc:
                return f = L(), A(), f.callee = Fa($a(), !0), f.arguments = E(Y) ? xb(W, !1) : Uc, y(f, "NewExpression");
        }
        aa();
    }
    function rb(f, g) {
        x === sa ? f.id = ba() : g ? aa() : f.id = null;
        f.ma = [];
        var k = !0;
        for (G(Y); !E(W);)
            k ? k = !1 : G(ha), f.ma.push(ba());
        k = Da;
        var n = H;
        Da = !0;
        H = [];
        f.body = Ea(!0);
        Da = k;
        H = n;
        if (S || f.body.body.length && kb(f.body.body[0]))
            for (k = f.id ? -1 : 0; k < f.ma.length; ++k)
                if (n = 0 > k ? f.id : f.ma[k], (xc(n.name) || Ya(n.name)) && c(n.start, "Defining '" + n.name + "' in strict mode"), 0 <= k)
                    for (var w = 0; w < k; ++w)
                        n.name === f.ma[w].name && c(n.start, "Argument name clash in strict mode");
        return y(f, g ? "FunctionDeclaration" : "FunctionExpression");
    }
    function xb(f, g, k) {
        for (var n = [], w = !0; !E(f);) {
            if (w)
                w = !1;
            else if (G(ha), g && z.rb && E(f))
                break;
            n.push(k && x === ha ? null : O(!0));
        }
        return n;
    }
    function ba(f) {
        var g = L();
        f && "everywhere" === z.xb && (f = !1);
        x === sa ? (!f && (z.xb && Vc(T) || S && xc(T)) && -1 === r.slice(I, oa).indexOf("\\") && c(I, "The keyword '" + T + "' is reserved"), g.name = T) : f && x.l ? g.name = x.l : aa();
        xa = !1;
        A();
        return y(g, "Identifier");
    }
    a.version = "0.5.0";
    var z, r = "", pa, jb;
    a.parse = function (f, g) {
        r = String(f);
        pa = r.length;
        z = g || {};
        for (var k in yc)
            Object.prototype.hasOwnProperty.call(z, k) || (z[k] = yc[k]);
        jb = z.sourceFile;
        la = 1;
        m = X = 0;
        xa = !0;
        C();
        k = z.$b;
        gb = ia = m;
        z.B && (hb = new h());
        Da = S = !1;
        H = [];
        N();
        f = k || L();
        g = !0;
        k || (f.body = []);
        for (; x !== fb;)
            k = U(), f.body.push(k), g && kb(k) && ib(!0), g = !1;
        return y(f, "Program");
    };
    var yc = {
        bc: !1,
        rb: !0,
        xb: !1,
        Fb: !1,
        B: !1,
        ua: null,
        Ua: !1,
        $b: null,
        sourceFile: null,
        ub: null
    }, m = 0, I = 0, oa = 0, eb, bb, x, T, xa, la, X, gb = 0, ia = 0, hb, Da, H, S, Uc = [], Ba = {
        type: "num"
    }, ac = {
        type: "regexp"
    }, Ta = {
        type: "string"
    }, sa = {
        type: "name"
    }, fb = {
        type: "eof"
    }, lb = {
        l: "break"
    }, tb = {
        l: "case",
        m: !0
    }, pc = {
        l: "catch"
    }, dc = {
        l: "continue"
    }, ec = {
        l: "debugger"
    }, mc = {
        l: "default"
    }, fc = {
        l: "do",
        U: !0
    }, kc = {
        l: "else",
        m: !0
    }, qc = {
        l: "finally"
    }, gc = {
        l: "for",
        U: !0
    }, qb = {
        l: "function"
    }, jc = {
        l: "if"
    }, lc = {
        l: "return",
        m: !0
    }, sb = {
        l: "switch"
    }, nc = {
        l: "throw",
        m: !0
    }, oc = {
        l: "try"
    }, pb = {
        l: "var"
    }, nb = {
        l: "while",
        U: !0
    }, rc = {
        l: "with"
    }, wc = {
        l: "new",
        m: !0
    }, sc = {
        l: "this"
    }, tc = {
        l: "null",
        Ya: null
    }, uc = {
        l: "true",
        Ya: !0
    }, vc = {
        l: "false",
        Ya: !1
    }, Za = {
        l: "in",
        K: 7,
        m: !0
    }, Sc = {
        "break": lb,
        "case": tb,
        "catch": pc,
        "continue": dc,
        "debugger": ec,
        "default": mc,
        "do": fc,
        "else": kc,
        "finally": qc,
        "for": gc,
        "function": qb,
        "if": jc,
        "return": lc,
        "switch": sb,
        "throw": nc,
        "try": oc,
        "var": pb,
        "while": nb,
        "with": rc,
        "null": tc,
        "true": uc,
        "false": vc,
        "new": wc,
        "in": Za,
        "instanceof": {
            l: "instanceof",
            K: 7,
            m: !0
        },
        "this": sc,
        "typeof": {
            l: "typeof",
            prefix: !0,
            m: !0
        },
        "void": {
            l: "void",
            prefix: !0,
            m: !0
        },
        "delete": {
            l: "delete",
            prefix: !0,
            m: !0
        }
    }, cb = {
        type: "[",
        m: !0
    }, db = {
        type: "]"
    }, ya = {
        type: "{",
        m: !0
    }, qa = {
        type: "}"
    }, Y = {
        type: "(",
        m: !0
    }, W = {
        type: ")"
    }, ha = {
        type: ",",
        m: !0
    }, Z = {
        type: ";",
        m: !0
    }, za = {
        type: ":",
        m: !0
    }, Rb = {
        type: "."
    }, Sb = {
        type: "?",
        m: !0
    }, Ub = {
        K: 10,
        m: !0
    }, Xb = {
        Ab: !0,
        m: !0
    }, ma = {
        Ab: !0,
        m: !0
    }, Mc = {
        Zb: !0,
        prefix: !0,
        Wb: !0
    }, Yb = {
        prefix: !0,
        m: !0
    }, Vb = {
        K: 1,
        m: !0
    }, Wb = {
        K: 2,
        m: !0
    }, Jc = {
        K: 3,
        m: !0
    }, Lc = {
        K: 4,
        m: !0
    }, Kc = {
        K: 5,
        m: !0
    }, Qc = {
        K: 6,
        m: !0
    }, Pc = {
        K: 7,
        m: !0
    }, Oc = {
        K: 8,
        m: !0
    }, Nc = {
        K: 9,
        prefix: !0,
        m: !0
    }, Ic = {
        K: 10,
        m: !0
    }, Vc = e("class enum extends super const export import"), xc = e("implements interface let package private protected public static yield"), Ya = e("eval arguments"), Rc = e("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"), Hc = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Pb = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"), Gc = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"), Va = /[\n\r\u2028\u2029]/, Sa = /\r\n|[\n\r\u2028\u2029]/g, ra, mb = {
        kind: "loop"
    }, Tc = {
        kind: "switch"
    };
};
"object" === typeof exports && "object" === typeof module ? ca(exports) : "function" === typeof define && define.dc ? define(["exports"], ca) : ca(this.j || (this.j = {})); /*
                                                                                                                                                                             Copyright 2013 Google LLC
                                                                                                                                                                             SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                             */
function t(a, b) {
    "string" === typeof a && (a = da(a, "code"));
    var d = a.constructor;
    this.La = function () {
        return new d({
            options: {}
        });
    };
    var c = this.La(), e;
    for (e in a)
        c[e] = "body" === e ? a[e].slice() : a[e];
    this.pa = c;
    this.pb = b;
    this.xa = !1;
    this.aa = [];
    this.Va = 0;
    this.qb = Object.create(null);
    a = /^step([A-Z]\w*)$/;
    var h, l;
    for (l in this)
        "function" === typeof this[l] && (h = l.match(a)) && (this.qb[h[1]] = this[l].bind(this));
    this.O = ea(this, this.pa, null);
    this.Wa = this.O.object;
    this.pa = da(this.aa.join("\n"), "polyfills");
    this.aa = void 0;
    fa(this.pa);
    h = new u(this.pa, this.O);
    h.done = !1;
    this.o = [h];
    this.Bb();
    this.value = void 0;
    this.pa = c;
    h = new u(this.pa, this.O);
    h.done = !1;
    this.o.length = 0;
    this.o[0] = h;
}
var ka = {
    B: !0,
    ec: 5
}, ua = {
    configurable: !0,
    enumerable: !0,
    writable: !1
}, v = {
    configurable: !0,
    enumerable: !1,
    writable: !0
}, B = {
    configurable: !0,
    enumerable: !1,
    writable: !1
}, va = {
    configurable: !1,
    enumerable: !1,
    writable: !1
}, wa = {
    configurable: !1,
    enumerable: !0,
    writable: !0
}, Ga = {
    STEP_ERROR: !0
}, Ha = {
    SCOPE_REFERENCE: !0
}, Ia = {
    VALUE_IN_DESCRIPTOR: !0
}, Ja = {
    REGEXP_TIMEOUT: !0
}, Ka = [], La = null, Ma = null, Na = "undefined" === typeof globalThis ? this : globalThis, Oa = ["onmessage = function(e) {", "var result;", "var data = e.data;", "switch (data[0]) {", "case 'split':", "result = data[1].split(data[2], data[3]);", "break;", "case 'match':", "result = data[1].match(data[2]);", "break;", "case 'search':", "result = data[1].search(data[2]);", "break;", "case 'replace':", "result = data[1].replace(data[2], data[3]);", "break;", "case 'exec':", "var regexp = data[1];", "regexp.lastIndex = data[2];", "result = [regexp.exec(data[3]), data[1].lastIndex];", "break;", "default:", "throw Error('Unknown RegExp operation: ' + data[0]);", "}", "postMessage(result);", "close();", "};"];
function Pa(a) {
    var b = a >>> 0;
    return b === Number(a) ? b : NaN;
}
function Qa(a) {
    var b = a >>> 0;
    return String(b) === String(a) && 4294967295 !== b ? b : NaN;
}
function fa(a, b, d) {
    b ? a.start = b : delete a.start;
    d ? a.end = d : delete a.end;
    for (var c in a)
        if ("loc" !== c && a.hasOwnProperty(c)) {
            var e = a[c];
            e && "object" === typeof e && fa(e, b, d);
        }
}
t.prototype.REGEXP_MODE = 2;
t.prototype.REGEXP_THREAD_TIMEOUT = 1E3;
t.prototype.POLYFILL_TIMEOUT = 1E3;
p = t.prototype;
p.P = !1;
p.Ia = !1;
p.Hb = 0;
function da(a, b) {
    var d = {}, c;
    for (c in ka)
        d[c] = ka[c];
    d.sourceFile = b;
    return Na.j.parse(a, d);
}
p.Gb = function (a) {
    var b = this.o[0];
    if (!b || "Program" !== b.node.type)
        throw Error("Expecting original AST to start with a Program node");
    "string" === typeof a && (a = da(a, "appendCode" + this.Hb++));
    if (!a || "Program" !== a.type)
        throw Error("Expecting new AST to start with a Program node");
    Ra(this, a, b.scope);
    Array.prototype.push.apply(b.node.body, a.body);
    b.node.body.ib = null;
    b.done = !1;
};
p.kb = function () {
    var a = this.o, b;
    do {
        var d = a[a.length - 1];
        if (!d)
            return !1;
        var c = d.node, e = c.type;
        if ("Program" === e && d.done)
            return !1;
        if (this.xa)
            break;
        var h = Ma;
        Ma = this;
        try {
            var l = this.qb[e](a, d, c);
        }
        catch (q) {
            if (q !== Ga)
                throw this.value !== q && (this.value = void 0), q;
        }
        finally {
            Ma = h;
        }
        l && a.push(l);
        if (this.P)
            throw this.value = void 0, Error("Getter not supported in this context");
        if (this.Ia)
            throw this.value = void 0, Error("Setter not supported in this context");
        b || c.end || (b = Date.now() + this.POLYFILL_TIMEOUT);
    } while (!c.end && b > Date.now());
    return !0;
};
p.Bb = function () {
    for (; !this.xa && this.kb();)
        ;
    return this.xa;
};
function ab(a, b) {
    a.g(b, "NaN", NaN, va);
    a.g(b, "Infinity", Infinity, va);
    a.g(b, "undefined", void 0, va);
    a.g(b, "window", b, ua);
    a.g(b, "this", b, va);
    a.g(b, "self", b);
    a.M = new D(null);
    a.X = new D(a.M);
    zb(a, b);
    Ab(a, b);
    b.wa = a.M;
    a.g(b, "constructor", a.v, v);
    Bb(a, b);
    Cb(a, b);
    Db(a, b);
    Eb(a, b);
    Fb(a, b);
    Gb(a, b);
    Hb(a, b);
    Ib(a, b);
    Jb(a, b);
    var d = a.i(function () {
        throw EvalError("Can't happen");
    }, !1);
    d.eval = !0;
    a.g(b, "eval", d, v);
    a.g(b, "parseInt", a.i(parseInt, !1), v);
    a.g(b, "parseFloat", a.i(parseFloat, !1), v);
    a.g(b, "isNaN", a.i(isNaN, !1), v);
    a.g(b, "isFinite", a.i(isFinite, !1), v);
    d = [[escape, "escape"], [unescape, "unescape"], [decodeURI, "decodeURI"], [decodeURIComponent, "decodeURIComponent"], [encodeURI, "encodeURI"], [encodeURIComponent, "encodeURIComponent"]];
    for (var c = 0; c < d.length; c++)
        a.g(b, d[c][1], a.i(function (e) {
            return function (h) {
                try {
                    return e(h);
                }
                catch (l) {
                    K(a, a.Db, l.message);
                }
            };
        }(d[c][0]), !1), v);
    a.OBJECT = a.v;
    a.OBJECT_PROTO = a.M;
    a.FUNCTION = a.N;
    a.FUNCTION_PROTO = a.X;
    a.ARRAY = a.oa;
    a.ARRAY_PROTO = a.Ja;
    a.REGEXP = a.H;
    a.REGEXP_PROTO = a.Ka;
    a.DATE = a.Y;
    a.DATE_PROTO = a.mb;
    a.pb && a.pb(a, b);
}
p.Sb = 0;
function zb(a, b) {
    var d = /^[A-Za-z_$][\w$]*$/;
    var c = function (e) {
        var h = arguments.length ? String(arguments[arguments.length - 1]) : "", l = Array.prototype.slice.call(arguments, 0, -1).join(",").trim();
        if (l) {
            l = l.split(/\s*,\s*/);
            for (var q = 0; q < l.length; q++) {
                var C = l[q];
                d.test(C) || K(a, a.$, "Invalid function argument: " + C);
            }
            l = l.join(", ");
        }
        try {
            var V = da("(function(" + l + ") {" + h + "})", "function" + a.Sb++);
        }
        catch (N) {
            K(a, a.$, "Invalid code: " + N.message);
        }
        1 !== V.body.length && K(a, a.$, "Invalid code in function body");
        return Kb(a, V.body[0].ja, a.O, "anonymous");
    };
    a.N = a.i(c, !0);
    a.g(b, "Function", a.N, v);
    a.g(a.N, "prototype", a.X, v);
    a.g(a.X, "constructor", a.N, v);
    a.X.Qa = function () { };
    a.X.Qa.id = a.Va++;
    a.X.yb = !0;
    a.g(a.X, "length", 0, B);
    a.X.L = "Function";
    c = function (e, h) {
        var l = a.o[a.o.length - 1];
        l.ea = this;
        l.C = e;
        l.G = [];
        null !== h && void 0 !== h && (h instanceof D ? l.G = Lb(a, h) : K(a, a.j, "CreateListFromArrayLike called on non-object"));
        l.cb = !1;
    };
    M(a, a.N, "apply", c);
    c = function (e) {
        var h = a.o[a.o.length - 1];
        h.ea = this;
        h.C = e;
        h.G = [];
        for (var l = 1; l < arguments.length; l++)
            h.G.push(arguments[l]);
        h.cb = !1;
    };
    M(a, a.N, "call", c);
    a.aa.push("Object.defineProperty(Function.prototype, 'bind',", "{configurable: true, writable: true, value:", "function bind(oThis) {", "if (typeof this !== 'function') {", "throw TypeError('What is trying to be bound is not callable');", "}", "var aArgs   = Array.prototype.slice.call(arguments, 1),", "fToBind = this,", "fNOP    = function() {},", "fBound  = function() {", "return fToBind.apply(this instanceof fNOP", "? this", ": oThis,", "aArgs.concat(Array.prototype.slice.call(arguments)));", "};", "if (this.prototype) {", "fNOP.prototype = this.prototype;", "}", "fBound.prototype = new fNOP();", "return fBound;", "}", "});", "");
    c = function () {
        return String(this);
    };
    M(a, a.N, "toString", c);
    a.g(a.N, "toString", a.i(c, !1), v);
    c = function () {
        return this.valueOf();
    };
    M(a, a.N, "valueOf", c);
    a.g(a.N, "valueOf", a.i(c, !1), v);
}
function Ab(a, b) {
    function d(e) {
        void 0 !== e && null !== e || K(a, a.j, "Cannot convert '" + e + "' to object");
    }
    var c = function (e) {
        if (void 0 === e || null === e)
            return Mb(a) ? this : a.s(a.M);
        if (!(e instanceof D)) {
            var h = a.s(Nb(a, e));
            h.data = e;
            return h;
        }
        return e;
    };
    a.v = a.i(c, !0);
    a.g(a.v, "prototype", a.M, v);
    a.g(a.M, "constructor", a.v, v);
    a.g(b, "Object", a.v, v);
    c = function (e) {
        d(e);
        return Ob(a, Object.getOwnPropertyNames(e instanceof D ? e.h : e));
    };
    a.g(a.v, "getOwnPropertyNames", a.i(c, !1), v);
    c = function (e) {
        d(e);
        e instanceof D && (e = e.h);
        return Ob(a, Object.keys(e));
    };
    a.g(a.v, "keys", a.i(c, !1), v);
    c = function (e) {
        if (null === e)
            return a.s(null);
        e instanceof D || K(a, a.j, "Object prototype may only be an Object or null, not " + e);
        return a.s(e);
    };
    a.g(a.v, "create", a.i(c, !1), v);
    a.aa.push("(function() {", "var create_ = Object.create;", "Object.create = function create(proto, props) {", "var obj = create_(proto);", "props && Object.defineProperties(obj, props);", "return obj;", "};", "})();", "");
    c = function (e, h, l) {
        h = String(h);
        e instanceof D || K(a, a.j, "Object.defineProperty called on non-object: " + e);
        l instanceof D || K(a, a.j, "Property description must be an object");
        !e.preventExtensions || h in e.h || K(a, a.j, "Can't define property '" + h + "', object is not extensible");
        a.g(e, h, Ia, l.h);
        return e;
    };
    a.g(a.v, "defineProperty", a.i(c, !1), v);
    a.aa.push("(function() {", "var defineProperty_ = Object.defineProperty;", "Object.defineProperty = function defineProperty(obj, prop, d1) {", "var d2 = {};", "if ('configurable' in d1) d2.configurable = d1.configurable;", "if ('enumerable' in d1) d2.enumerable = d1.enumerable;", "if ('writable' in d1) d2.writable = d1.writable;", "if ('value' in d1) d2.value = d1.value;", "if ('get' in d1) d2.get = d1.get;", "if ('set' in d1) d2.set = d1.set;", "return defineProperty_(obj, prop, d2);", "};", "})();", "Object.defineProperty(Object, 'defineProperties',", "{configurable: true, writable: true, value:", "function defineProperties(obj, props) {", "var keys = Object.keys(props);", "for (var i = 0; i < keys.length; i++) {", "Object.defineProperty(obj, keys[i], props[keys[i]]);", "}", "return obj;", "}", "});", "");
    c = function (e, h) {
        e instanceof D || K(a, a.j, "Object.getOwnPropertyDescriptor called on non-object: " + e);
        h = String(h);
        if (h in e.h) {
            var l = Object.getOwnPropertyDescriptor(e.h, h), q = e.T[h];
            e = e.W[h];
            h = a.s(a.M);
            q || e ? (a.g(h, "get", q), a.g(h, "set", e)) : (a.g(h, "value", l.value), a.g(h, "writable", l.writable));
            a.g(h, "configurable", l.configurable);
            a.g(h, "enumerable", l.enumerable);
            return h;
        }
    };
    a.g(a.v, "getOwnPropertyDescriptor", a.i(c, !1), v);
    c = function (e) {
        d(e);
        return Nb(a, e);
    };
    a.g(a.v, "getPrototypeOf", a.i(c, !1), v);
    c = function (e) {
        return !!e && !e.preventExtensions;
    };
    a.g(a.v, "isExtensible", a.i(c, !1), v);
    c = function (e) {
        e instanceof D && (e.preventExtensions = !0);
        return e;
    };
    a.g(a.v, "preventExtensions", a.i(c, !1), v);
    M(a, a.v, "toString", D.prototype.toString);
    M(a, a.v, "toLocaleString", D.prototype.toString);
    M(a, a.v, "valueOf", D.prototype.valueOf);
    c = function (e) {
        d(this);
        return this instanceof D ? String(e) in this.h : this.hasOwnProperty(e);
    };
    M(a, a.v, "hasOwnProperty", c);
    c = function (e) {
        d(this);
        return this instanceof D ? Object.prototype.propertyIsEnumerable.call(this.h, e) : this.propertyIsEnumerable(e);
    };
    M(a, a.v, "propertyIsEnumerable", c);
    c = function (e) {
        for (;;) {
            e = Nb(a, e);
            if (!e)
                return !1;
            if (e === this)
                return !0;
        }
    };
    M(a, a.v, "isPrototypeOf", c);
}
function Bb(a, b) {
    var d = function (c) {
        var e = Mb(a) ? this : zc(a), h = arguments[0];
        if (1 === arguments.length && "number" === typeof h)
            isNaN(Pa(h)) && K(a, a.nb, "Invalid array length: " + h), e.h.length = h;
        else {
            for (h = 0; h < arguments.length; h++)
                e.h[h] = arguments[h];
            e.h.length = h;
        }
        return e;
    };
    a.oa = a.i(d, !0);
    a.Ja = a.oa.h.prototype;
    a.g(b, "Array", a.oa, v);
    d = function (c) {
        return c && "Array" === c.L;
    };
    a.g(a.oa, "isArray", a.i(d, !1), v);
    a.g(a.Ja, "length", 0, {
        configurable: !1,
        enumerable: !1,
        writable: !0
    });
    a.Ja.L = "Array";
    a.aa.push("(function() {", "function createArrayMethod_(f) {", "Object.defineProperty(Array.prototype, f.name,", "{configurable: true, writable: true, value: f});", "}", "createArrayMethod_(", "function pop() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "o.length = 0;", "return undefined;", "}", "len--;", "var x = o[len];", "delete o[len];", "o.length = len;", "return x;", "}", ");", "createArrayMethod_(", "function push(var_args) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "for (var i = 0; i < arguments.length; i++) {", "o[len] = arguments[i];", "len++;", "}", "o.length = len;", "return len;", "}", ");", "createArrayMethod_(", "function shift() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "o.length = 0;", "return undefined;", "}", "var value = o[0];", "for (var i = 0; i < len - 1; i++) {", "if ((i + 1) in o) {", "o[i] = o[i + 1];", "} else {", "delete o[i];", "}", "}", "delete o[i];", "o.length = len - 1;", "return value;", "}", ");", "createArrayMethod_(", "function unshift(var_args) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 0) {", "len = 0;", "}", "for (var i = len - 1; i >= 0; i--) {", "if (i in o) {", "o[i + arguments.length] = o[i];", "} else {", "delete o[i + arguments.length];", "}", "}", "for (var i = 0; i < arguments.length; i++) {", "o[i] = arguments[i];", "}", "return (o.length = len + arguments.length);", "}", ");", "createArrayMethod_(", "function reverse() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len || len < 2) {", "return o;", "}", "for (var i = 0; i < len / 2 - 0.5; i++) {", "var x = o[i];", "var hasX = i in o;", "if ((len - i - 1) in o) {", "o[i] = o[len - i - 1];", "} else {", "delete o[i];", "}", "if (hasX) {", "o[len - i - 1] = x;", "} else {", "delete o[len - i - 1];", "}", "}", "return o;", "}", ");", "createArrayMethod_(", "function indexOf(searchElement, fromIndex) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var n = fromIndex | 0;", "if (!len || n >= len) {", "return -1;", "}", "var i = Math.max(n >= 0 ? n : len - Math.abs(n), 0);", "while (i < len) {", "if (i in o && o[i] === searchElement) {", "return i;", "}", "i++;", "}", "return -1;", "}", ");", "createArrayMethod_(", "function lastIndexOf(searchElement, fromIndex) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "if (!len) {", "return -1;", "}", "var n = len - 1;", "if (arguments.length > 1) {", "n = fromIndex | 0;", "if (n) {", "n = (n > 0 || -1) * Math.floor(Math.abs(n));", "}", "}", "var i = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);", "while (i >= 0) {", "if (i in o && o[i] === searchElement) {", "return i;", "}", "i--;", "}", "return -1;", "}", ");", "createArrayMethod_(", "function slice(start, end) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "start |= 0;", "start = (start >= 0) ? start : Math.max(0, len + start);", "if (typeof end !== 'undefined') {", "if (end !== Infinity) {", "end |= 0;", "}", "if (end < 0) {", "end = len + end;", "} else {", "end = Math.min(end, len);", "}", "} else {", "end = len;", "}", "var size = end - start;", "var cloned = new Array(size);", "for (var i = 0; i < size; i++) {", "if ((start + i) in o) {", "cloned[i] = o[start + i];", "}", "}", "return cloned;", "}", ");", "createArrayMethod_(", "function splice(start, deleteCount, var_args) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "start |= 0;", "if (start < 0) {", "start = Math.max(len + start, 0);", "} else {", "start = Math.min(start, len);", "}", "if (arguments.length < 1) {", "deleteCount = len - start;", "} else {", "deleteCount |= 0;", "deleteCount = Math.max(0, Math.min(deleteCount, len - start));", "}", "var removed = [];", "for (var i = start; i < start + deleteCount; i++) {", "if (i in o) {", "removed.push(o[i]);", "} else {", "removed.length++;", "}", "if ((i + deleteCount) in o) {", "o[i] = o[i + deleteCount];", "} else {", "delete o[i];", "}", "}", "for (var i = start + deleteCount; i < len - deleteCount; i++) {", "if ((i + deleteCount) in o) {", "o[i] = o[i + deleteCount];", "} else {", "delete o[i];", "}", "}", "for (var i = len - deleteCount; i < len; i++) {", "delete o[i];", "}", "len -= deleteCount;", "var arl = arguments.length - 2;", "for (var i = len - 1; i >= start; i--) {", "if (i in o) {", "o[i + arl] = o[i];", "} else {", "delete o[i + arl];", "}", "}", "len += arl;", "for (var i = 2; i < arguments.length; i++) {", "o[start + i - 2] = arguments[i];", "}", "o.length = len;", "return removed;", "}", ");", "createArrayMethod_(", "function concat(var_args) {", "if (!this) throw TypeError();", "var o = Object(this);", "var cloned = [];", "for (var i = -1; i < arguments.length; i++) {", "var value = (i === -1) ? o : arguments[i];", "if (Array.isArray(value)) {", "for (var j = 0, l = value.length; j < l; j++) {", "if (j in value) {", "cloned.push(value[j]);", "} else {", "cloned.length++;", "}", "}", "} else {", "cloned.push(value);", "}", "}", "return cloned;", "}", ");", "createArrayMethod_(", "function join(opt_separator) {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var sep = typeof opt_separator === 'undefined' ?", "',' : ('' + opt_separator);", "var str = '';", "for (var i = 0; i < len; i++) {", "if (i && sep) {", "str += sep;", "}", "str += (o[i] === null || o[i] === undefined) ? '' : o[i];", "}", "return str;", "}", ");", "createArrayMethod_(", "function every(callbackfn, thisArg) {", "if (!this || typeof callbackfn !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "while (k < len) {", "if (k in o && !callbackfn.call(t, o[k], k, o)) return false;", "k++;", "}", "return true;", "}", ");", "createArrayMethod_(", "function filter(fun, var_args) {", "if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var res = [];", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in o) {", "var val = o[i];", "if (fun.call(thisArg, val, i, o)) res.push(val);", "}", "}", "return res;", "}", ");", "createArrayMethod_(", "function forEach(callback, thisArg) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "while (k < len) {", "if (k in o) callback.call(t, o[k], k, o);", "k++;", "}", "}", ");", "createArrayMethod_(", "function map(callback, thisArg) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var t, k = 0;", "var o = Object(this), len = o.length >>> 0;", "if (arguments.length > 1) t = thisArg;", "var a = new Array(len);", "while (k < len) {", "if (k in o) a[k] = callback.call(t, o[k], k, o);", "k++;", "}", "return a;", "}", ");", "createArrayMethod_(", "function reduce(callback /*, initialValue*/) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var k = 0, value;", "if (arguments.length === 2) {", "value = arguments[1];", "} else {", "while (k < len && !(k in o)) k++;", "if (k >= len) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = o[k++];", "}", "for (; k < len; k++) {", "if (k in o) value = callback(value, o[k], k, o);", "}", "return value;", "}", ");", "createArrayMethod_(", "function reduceRight(callback /*, initialValue*/) {", "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var k = len - 1, value;", "if (arguments.length >= 2) {", "value = arguments[1];", "} else {", "while (k >= 0 && !(k in o)) k--;", "if (k < 0) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = o[k--];", "}", "for (; k >= 0; k--) {", "if (k in o) value = callback(value, o[k], k, o);", "}", "return value;", "}", ");", "createArrayMethod_(", "function some(fun/*, thisArg*/) {", "if (!this || typeof fun !== 'function') throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in o && fun.call(thisArg, o[i], i, o)) {", "return true;", "}", "}", "return false;", "}", ");", "createArrayMethod_(", "function sort(opt_comp) {", "if (!this) throw TypeError();", "if (typeof opt_comp !== 'function') {", "opt_comp = undefined;", "}", "for (var i = 0; i < this.length; i++) {", "var changes = 0;", "for (var j = 0; j < this.length - i - 1; j++) {", "if (opt_comp ? (opt_comp(this[j], this[j + 1]) > 0) :", "(String(this[j]) > String(this[j + 1]))) {", "var swap = this[j];", "var hasSwap = j in this;", "if ((j + 1) in this) {", "this[j] = this[j + 1];", "} else {", "delete this[j];", "}", "if (hasSwap) {", "this[j + 1] = swap;", "} else {", "delete this[j + 1];", "}", "changes++;", "}", "}", "if (!changes) break;", "}", "return this;", "}", ");", "createArrayMethod_(", "function toLocaleString() {", "if (!this) throw TypeError();", "var o = Object(this), len = o.length >>> 0;", "var out = [];", "for (var i = 0; i < len; i++) {", "out[i] = (o[i] === null || o[i] === undefined) ? '' : o[i].toLocaleString();", "}", "return out.join(',');", "}", ");", "})();", "");
}
function Cb(a, b) {
    var d = function (c) {
        c = arguments.length ? Na.String(c) : "";
        return Mb(a) ? (this.data = c, this) : c;
    };
    a.I = a.i(d, !0);
    a.g(b, "String", a.I, v);
    a.g(a.I, "fromCharCode", a.i(String.fromCharCode, !1), v);
    b = "charAt charCodeAt concat indexOf lastIndexOf slice substr substring toLocaleLowerCase toLocaleUpperCase toLowerCase toUpperCase trim".split(" ");
    for (d = 0; d < b.length; d++)
        M(a, a.I, b[d], String.prototype[b[d]]);
    d = function (c, e, h) {
        e = a.R(e);
        h = a.R(h);
        try {
            return String(this).localeCompare(c, e, h);
        }
        catch (l) {
            K(a, a.D, "localeCompare: " + l.message);
        }
    };
    M(a, a.I, "localeCompare", d);
    d = function (c, e, h) {
        var l = String(this);
        e = e ? Number(e) : void 0;
        if (Q(a, c, a.H) && (c = c.data, Ac(a, c, h), 2 === a.REGEXP_MODE)) {
            if (La)
                c = Bc(a, "string.split(separator, limit)", {
                    string: l,
                    separator: c,
                    limit: e
                }, c, h), c !== Ja && h(Ob(a, c));
            else {
                var q = a.ga(), C = Cc(a, c, q, h);
                q.onmessage = function (V) {
                    clearTimeout(C);
                    h(Ob(a, V.data));
                };
                q.postMessage(["split", l, c, e]);
            }
            return;
        }
        c = l.split(c, e);
        h(Ob(a, c));
    };
    Dc(a, a.I, "split", d);
    d = function (c, e) {
        var h = String(this);
        c = Q(a, c, a.H) ? c.data : new RegExp(c);
        Ac(a, c, e);
        if (2 === a.REGEXP_MODE) {
            if (La)
                c = Bc(a, "string.match(regexp)", {
                    string: h,
                    regexp: c
                }, c, e), c !== Ja && e(c && Ob(a, c));
            else {
                var l = a.ga(), q = Cc(a, c, l, e);
                l.onmessage = function (C) {
                    clearTimeout(q);
                    e(C.data && Ob(a, C.data));
                };
                l.postMessage(["match", h, c]);
            }
        }
        else
            c = h.match(c), e(c && Ob(a, c));
    };
    Dc(a, a.I, "match", d);
    d = function (c, e) {
        var h = String(this);
        Q(a, c, a.H) ? c = c.data : c = new RegExp(c);
        Ac(a, c, e);
        if (2 === a.REGEXP_MODE) {
            if (La)
                c = Bc(a, "string.search(regexp)", {
                    string: h,
                    regexp: c
                }, c, e), c !== Ja && e(c);
            else {
                var l = a.ga(), q = Cc(a, c, l, e);
                l.onmessage = function (C) {
                    clearTimeout(q);
                    e(C.data);
                };
                l.postMessage(["search", h, c]);
            }
        }
        else
            e(h.search(c));
    };
    Dc(a, a.I, "search", d);
    d = function (c, e, h) {
        var l = String(this);
        e = String(e);
        if (Q(a, c, a.H) && (c = c.data, Ac(a, c, h), 2 === a.REGEXP_MODE)) {
            if (La)
                c = Bc(a, "string.replace(substr, newSubstr)", {
                    string: l,
                    substr: c,
                    newSubstr: e
                }, c, h), c !== Ja && h(c);
            else {
                var q = a.ga(), C = Cc(a, c, q, h);
                q.onmessage = function (V) {
                    clearTimeout(C);
                    h(V.data);
                };
                q.postMessage(["replace", l, c, e]);
            }
            return;
        }
        h(l.replace(c, e));
    };
    Dc(a, a.I, "replace", d);
    a.aa.push("(function() {", "var replace_ = String.prototype.replace;", "String.prototype.replace = function replace(substr, newSubstr) {", "if (typeof newSubstr !== 'function') {", "return replace_.call(this, substr, newSubstr);", "}", "var str = this;", "if (substr instanceof RegExp) {", "var subs = [];", "var m = substr.exec(str);", "while (m) {", "m.push(m.index, str);", "var inject = newSubstr.apply(null, m);", "subs.push([m.index, m[0].length, inject]);", "m = substr.global ? substr.exec(str) : null;", "}", "for (var i = subs.length - 1; i >= 0; i--) {", "str = str.substring(0, subs[i][0]) + subs[i][2] + str.substring(subs[i][0] + subs[i][1]);", "}", "} else {", "var i = str.indexOf(substr);", "if (i !== -1) {", "var inject = newSubstr(str.substr(i, substr.length), i, str);", "str = str.substring(0, i) + inject + str.substring(i + substr.length);", "}", "}", "return str;", "};", "})();", "");
}
function Db(a, b) {
    a.lb = a.i(function (d) {
        d = Na.Boolean(d);
        return Mb(a) ? (this.data = d, this) : d;
    }, !0);
    a.g(b, "Boolean", a.lb, v);
}
function Eb(a, b) {
    var d = function (c) {
        c = arguments.length ? Na.Number(c) : 0;
        return Mb(a) ? (this.data = c, this) : c;
    };
    a.Z = a.i(d, !0);
    a.g(b, "Number", a.Z, v);
    b = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
    for (d = 0; d < b.length; d++)
        a.g(a.Z, b[d], Number[b[d]], va);
    d = function (c) {
        try {
            return Number(this).toExponential(c);
        }
        catch (e) {
            K(a, a.D, e.message);
        }
    };
    M(a, a.Z, "toExponential", d);
    d = function (c) {
        try {
            return Number(this).toFixed(c);
        }
        catch (e) {
            K(a, a.D, e.message);
        }
    };
    M(a, a.Z, "toFixed", d);
    d = function (c) {
        try {
            return Number(this).toPrecision(c);
        }
        catch (e) {
            K(a, a.D, e.message);
        }
    };
    M(a, a.Z, "toPrecision", d);
    d = function (c) {
        try {
            return Number(this).toString(c);
        }
        catch (e) {
            K(a, a.D, e.message);
        }
    };
    M(a, a.Z, "toString", d);
    d = function (c, e) {
        c = c ? a.R(c) : void 0;
        e = e ? a.R(e) : void 0;
        try {
            return Number(this).toLocaleString(c, e);
        }
        catch (h) {
            K(a, a.D, "toLocaleString: " + h.message);
        }
    };
    M(a, a.Z, "toLocaleString", d);
}
function Fb(a, b) {
    var d = function (e, h) {
        if (!Mb(a))
            return Na.Date();
        var l = [null].concat(Array.from(arguments));
        this.data = new (Function.prototype.bind.apply(Na.Date, l))();
        return this;
    };
    a.Y = a.i(d, !0);
    a.mb = a.Y.h.prototype;
    a.g(b, "Date", a.Y, v);
    a.g(a.Y, "now", a.i(Date.now, !1), v);
    a.g(a.Y, "parse", a.i(Date.parse, !1), v);
    a.g(a.Y, "UTC", a.i(Date.UTC, !1), v);
    b = "getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toISOString toJSON toGMTString toLocaleDateString toLocaleString toLocaleTimeString toTimeString toUTCString".split(" ");
    for (var c = 0; c < b.length; c++)
        d = function (e) {
            return function (h) {
                var l = this.data;
                l instanceof Date || K(a, a.j, e + " not called on a Date");
                for (var q = [], C = 0; C < arguments.length; C++)
                    q[C] = a.R(arguments[C]);
                return l[e].apply(l, q);
            };
        }(b[c]), M(a, a.Y, b[c], d);
}
function Gb(a, b) {
    var d = function (c, e) {
        if (Mb(a))
            var h = this;
        else {
            if (void 0 === e && Q(a, c, a.H))
                return c;
            h = a.s(a.Ka);
        }
        c = void 0 === c ? "" : String(c);
        e = e ? String(e) : "";
        /^[gmi]*$/.test(e) || K(a, a.$, "Invalid regexp flag: " + e);
        try {
            var l = new Na.RegExp(c, e);
        }
        catch (q) {
            K(a, a.$, q.message);
        }
        Ec(a, h, l);
        return h;
    };
    a.H = a.i(d, !0);
    a.Ka = a.H.h.prototype;
    a.g(b, "RegExp", a.H, v);
    a.g(a.H.h.prototype, "global", void 0, B);
    a.g(a.H.h.prototype, "ignoreCase", void 0, B);
    a.g(a.H.h.prototype, "multiline", void 0, B);
    a.g(a.H.h.prototype, "source", "(?:)", B);
    a.aa.push("Object.defineProperty(RegExp.prototype, 'test',", "{configurable: true, writable: true, value:", "function test(str) {", "return !!this.exec(str);", "}", "});");
    d = function (c, e) {
        function h(N) {
            if (N) {
                var F = Ob(a, N);
                a.g(F, "index", N.index);
                a.g(F, "input", N.input);
                return F;
            }
            return null;
        }
        var l = this.data;
        c = String(c);
        l.lastIndex = Number(a.F(this, "lastIndex"));
        Ac(a, l, e);
        if (2 === a.REGEXP_MODE) {
            if (La)
                c = Bc(a, "regexp.exec(string)", {
                    string: c,
                    regexp: l
                }, l, e), c !== Ja && (a.g(this, "lastIndex", l.lastIndex), e(h(c)));
            else {
                var q = a.ga(), C = Cc(a, l, q, e), V = this;
                q.onmessage = function (N) {
                    clearTimeout(C);
                    a.g(V, "lastIndex", N.data[1]);
                    e(h(N.data[0]));
                };
                q.postMessage(["exec", l, l.lastIndex, c]);
            }
        }
        else
            c = l.exec(c), a.g(this, "lastIndex", l.lastIndex), e(h(c));
    };
    Dc(a, a.H, "exec", d);
}
function Hb(a, b) {
    function d(c) {
        var e = a.i(function (h) {
            var l = Mb(a) ? this : a.ya(e);
            Fc(a, l, h);
            return l;
        }, !0);
        a.g(e, "prototype", a.ya(a.D), v);
        a.g(e.h.prototype, "name", c, v);
        a.g(b, c, e, v);
        return e;
    }
    a.D = a.i(function (c) {
        var e = Mb(a) ? this : a.ya(a.D);
        Fc(a, e, c);
        return e;
    }, !0);
    a.g(b, "Error", a.D, v);
    a.g(a.D.h.prototype, "message", "", v);
    a.g(a.D.h.prototype, "name", "Error", v);
    d("EvalError");
    a.nb = d("RangeError");
    a.ob = d("ReferenceError");
    a.$ = d("SyntaxError");
    a.j = d("TypeError");
    a.Db = d("URIError");
}
function Ib(a, b) {
    var d = a.s(a.M);
    a.g(b, "Math", d, v);
    var c = "E LN2 LN10 LOG2E LOG10E PI SQRT1_2 SQRT2".split(" ");
    for (b = 0; b < c.length; b++)
        a.g(d, c[b], Math[c[b]], B);
    c = "abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan".split(" ");
    for (b = 0; b < c.length; b++)
        a.g(d, c[b], a.i(Math[c[b]], !1), v);
}
function Jb(a, b) {
    var d = a.s(a.M);
    a.g(b, "JSON", d, v);
    b = function (c) {
        try {
            var e = JSON.parse(String(c));
        }
        catch (h) {
            K(a, a.$, h.message);
        }
        return a.Ga(e);
    };
    a.g(d, "parse", a.i(b, !1));
    b = function (c, e, h) {
        e && "Function" === e.L ? K(a, a.j, "Function replacer on JSON.stringify not supported") : e && "Array" === e.L ? (e = Lb(a, e), e = e.filter(function (q) {
            return "string" === typeof q || "number" === typeof q;
        })) : e = null;
        "string" !== typeof h && "number" !== typeof h && (h = void 0);
        c = a.R(c);
        try {
            var l = JSON.stringify(c, e, h);
        }
        catch (q) {
            K(a, a.j, q.message);
        }
        return l;
    };
    a.g(d, "stringify", a.i(b, !1));
}
function Q(a, b, d) {
    if (null === b || void 0 === b || !d)
        return !1;
    d = d.h.prototype;
    if (b === d)
        return !0;
    for (b = Nb(a, b); b;) {
        if (b === d)
            return !0;
        b = b.wa;
    }
    return !1;
}
function Ec(a, b, d) {
    b.data = new RegExp(d.source, d.flags);
    a.g(b, "lastIndex", d.lastIndex, v);
    a.g(b, "source", d.source, B);
    a.g(b, "global", d.global, B);
    a.g(b, "ignoreCase", d.ignoreCase, B);
    a.g(b, "multiline", d.multiline, B);
}
function Fc(a, b, d) {
    d && a.g(b, "message", String(d), v);
    d = [];
    for (var c = a.o.length - 1; 0 <= c; c--) {
        var e = a.o[c], h = e.node;
        "CallExpression" === h.type && (e = e.ea) && d.length && (d[d.length - 1].Kb = a.F(e, "name"));
        !h.V || d.length && "CallExpression" !== h.type || d.push({
            Jb: h.V
        });
    }
    c = String(a.F(b, "name"));
    h = String(a.F(b, "message"));
    h = c + ": " + h + "\n";
    for (c = 0; c < d.length; c++) {
        var l = d[c].Jb;
        e = d[c].Kb;
        l = l.source + ":" + l.start.line + ":" + l.start.Za;
        h = e ? h + ("  at " + e + " (" + l + ")\n") : h + ("  at " + l + "\n");
    }
    a.g(b, "stack", h.trim(), v);
}
p.ga = function () {
    var a = this.ga.Ib;
    a || (a = new Blob([Oa.join("\n")], {
        type: "application/javascript"
    }), this.ga.Ib = a);
    return new Worker(URL.createObjectURL(a));
};
function Bc(a, b, d, c, e) {
    var h = {
        timeout: a.REGEXP_THREAD_TIMEOUT
    };
    try {
        return La.runInNewContext(b, d, h);
    }
    catch (l) {
        e(null), K(a, a.D, "RegExp Timeout: " + c);
    }
    return Ja;
}
function Ac(a, b, d) {
    if (0 === a.REGEXP_MODE)
        var c = !1;
    else if (1 === a.REGEXP_MODE)
        c = !0;
    else if (La)
        c = !0;
    else if ("function" === typeof Worker && "function" === typeof URL)
        c = !0;
    else if ("function" === typeof require) {
        try {
            La = require("vm");
        }
        catch (e) { }
        c = !!La;
    }
    else
        c = !1;
    c || (d(null), K(a, a.D, "Regular expressions not supported: " + b));
}
function Cc(a, b, d, c) {
    return setTimeout(function () {
        d.terminate();
        c(null);
        try {
            K(a, a.D, "RegExp Timeout: " + b);
        }
        catch (e) { }
    }, a.REGEXP_THREAD_TIMEOUT);
}
p.ya = function (a) {
    return this.s(a && a.h.prototype);
};
p.s = function (a) {
    if ("object" !== typeof a)
        throw Error("Non object prototype");
    a = new D(a);
    Q(this, a, this.D) && (a.L = "Error");
    return a;
};
function zc(a) {
    var b = a.s(a.Ja);
    a.g(b, "length", 0, {
        configurable: !1,
        enumerable: !1,
        writable: !0
    });
    b.L = "Array";
    return b;
}
function Wc(a, b, d) {
    var c = a.s(a.X);
    d ? (d = a.s(a.M), a.g(c, "prototype", d, v), a.g(d, "constructor", c, v)) : c.yb = !0;
    a.g(c, "length", b, B);
    c.L = "Function";
    return c;
}
function Kb(a, b, d, c) {
    var e = Wc(a, b.ma.length, !0);
    e.Sa = d;
    e.node = b;
    a.g(e, "name", b.id ? String(b.id.name) : c || "", B);
    return e;
}
p.i = function (a, b) {
    b = Wc(this, a.length, b);
    b.Qa = a;
    a.id = this.Va++;
    this.g(b, "name", a.name, B);
    return b;
};
p.tb = function (a) {
    var b = Wc(this, a.length, !0);
    b.Xa = a;
    a.id = this.Va++;
    this.g(b, "name", a.name, B);
    return b;
};
p.Ga = function (a) {
    if (a instanceof D)
        throw Error("Object is already pseudo");
    if (null === a || void 0 === a || !0 === a || !1 === a || "string" === typeof a || "number" === typeof a)
        return a;
    if (a instanceof RegExp) {
        var b = this.s(this.Ka);
        Ec(this, b, a);
        return b;
    }
    if (a instanceof Date)
        return b = this.s(this.mb), b.data = new Date(a.valueOf()), b;
    if ("function" === typeof a) {
        var d = this;
        b = Object.getOwnPropertyDescriptor(a, "prototype");
        return this.i(function () {
            var e = Array.prototype.slice.call(arguments).map(function (h) {
                return d.R(h);
            });
            e = a.apply(d, e);
            return d.Ga(e);
        }, !!b);
    }
    if (Array.isArray(a)) {
        b = zc(this);
        for (var c = 0; c < a.length; c++)
            c in a && this.g(b, c, this.Ga(a[c]));
        return b;
    }
    b = this.s(this.M);
    for (c in a)
        this.g(b, c, this.Ga(a[c]));
    return b;
};
p.R = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a || null === a)
        return a;
    if (!(a instanceof D))
        throw Error("Object is not pseudo");
    if (Q(this, a, this.H))
        return b = new RegExp(a.data.source, a.data.flags), b.lastIndex = a.data.lastIndex, b;
    if (Q(this, a, this.Y))
        return new Date(a.data.valueOf());
    b = b || {
        gb: [],
        Pa: []
    };
    var d = b.gb.indexOf(a);
    if (-1 !== d)
        return b.Pa[d];
    b.gb.push(a);
    if (Q(this, a, this.oa)) {
        d = [];
        b.Pa.push(d);
        for (var c = this.F(a, "length"), e = 0; e < c; e++)
            Xc(this, a, e) && (d[e] = this.R(this.F(a, e), b));
    }
    else
        for (c in d = {}, b.Pa.push(d), a.h)
            e = this.R(a.h[c], b), Object.defineProperty(d, c, {
                value: e,
                writable: !0,
                enumerable: !0,
                configurable: !0
            });
    b.gb.pop();
    b.Pa.pop();
    return d;
};
function Ob(a, b) {
    for (var d = zc(a), c = Object.getOwnPropertyNames(b), e = 0; e < c.length; e++)
        a.g(d, c[e], b[c[e]]);
    return d;
}
function Lb(a, b) {
    var d = [], c;
    for (c in b.h)
        d[c] = a.F(b, c);
    d.length = Pa(a.F(b, "length")) || 0;
    return d;
}
function Nb(a, b) {
    switch (typeof b) {
        case "number":
            return a.Z.h.prototype;
        case "boolean":
            return a.lb.h.prototype;
        case "string":
            return a.I.h.prototype;
    }
    return b ? b.wa : null;
}
p.F = function (a, b) {
    if (this.P)
        throw Error("Getter not supported in that context");
    b = String(b);
    void 0 !== a && null !== a || K(this, this.j, "Cannot read property '" + b + "' of " + a);
    if ("object" === typeof a && !(a instanceof D))
        throw TypeError("Expecting native value or pseudo object");
    if ("length" === b) {
        if (Q(this, a, this.I))
            return String(a).length;
    }
    else if (64 > b.charCodeAt(0) && Q(this, a, this.I)) {
        var d = Qa(b);
        if (!isNaN(d) && d < String(a).length)
            return String(a)[d];
    }
    do
        if (a.h && b in a.h)
            return (d = a.T[b]) ? (this.P = !0, d) : a.h[b];
    while (a = Nb(this, a));
};
function Xc(a, b, d) {
    if (!(b instanceof D))
        throw TypeError("Primitive data type has no properties");
    d = String(d);
    if ("length" === d && Q(a, b, a.I))
        return !0;
    if (Q(a, b, a.I)) {
        var c = Qa(d);
        if (!isNaN(c) && c < String(b).length)
            return !0;
    }
    do
        if (b.h && d in b.h)
            return !0;
    while (b = Nb(a, b));
    return !1;
}
p.g = function (a, b, d, c) {
    if (this.Ia)
        throw Error("Setter not supported in that context");
    b = String(b);
    void 0 !== a && null !== a || K(this, this.j, "Cannot set property '" + b + "' of " + a);
    if ("object" === typeof a && !(a instanceof D))
        throw TypeError("Expecting native value or pseudo object");
    c && ("get" in c || "set" in c) && ("value" in c || "writable" in c) && K(this, this.j, "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
    var e = !this.o || Yc(this).S;
    if (a instanceof D) {
        if (Q(this, a, this.I)) {
            var h = Qa(b);
            if ("length" === b || !isNaN(h) && h < String(a).length) {
                e && K(this, this.j, "Cannot assign to read only property '" + b + "' of String '" + a.data + "'");
                return;
            }
        }
        if ("Array" === a.L)
            if (h = a.h.length, "length" === b) {
                if (c) {
                    if (!("value" in c))
                        return;
                    d = c.value;
                }
                d = Pa(d);
                isNaN(d) && K(this, this.nb, "Invalid array length");
                if (d < h)
                    for (l in a.h) {
                        var l = Qa(l);
                        !isNaN(l) && d <= l && delete a.h[l];
                    }
            }
            else
                isNaN(l = Qa(b)) || (a.h.length = Math.max(h, l + 1));
        if (!a.preventExtensions || b in a.h) {
            if (c) {
                e = {};
                "get" in c && c.get && (a.T[b] = c.get, e.get = this.g.Xb);
                "set" in c && c.set && (a.W[b] = c.set, e.set = this.g.Yb);
                "configurable" in c && (e.configurable = c.configurable);
                "enumerable" in c && (e.enumerable = c.enumerable);
                "writable" in c && (e.writable = c.writable, delete a.T[b], delete a.W[b]);
                "value" in c ? (e.value = c.value, delete a.T[b], delete a.W[b]) : d !== Ia && (e.value = d, delete a.T[b], delete a.W[b]);
                try {
                    Object.defineProperty(a.h, b, e);
                }
                catch (q) {
                    K(this, this.j, "Cannot redefine property: " + b);
                }
                "get" in c && !c.get && delete a.T[b];
                "set" in c && !c.set && delete a.W[b];
            }
            else {
                if (d === Ia)
                    throw ReferenceError("Value not specified");
                for (c = a; !(b in c.h);)
                    if (c = Nb(this, c), !c) {
                        c = a;
                        break;
                    }
                if (c.W && c.W[b])
                    return this.Ia = !0, c.W[b];
                if (c.T && c.T[b])
                    e && K(this, this.j, "Cannot set property '" + b + "' of object '" + a + "' which only has a getter");
                else
                    try {
                        a.h[b] = d;
                    }
                    catch (q) {
                        e && K(this, this.j, "Cannot assign to read only property '" + b + "' of object '" + a + "'");
                    }
            }
        }
        else
            e && K(this, this.j, "Can't add property '" + b + "', object is not extensible");
    }
    else
        e && K(this, this.j, "Can't create property '" + b + "' on '" + a + "'");
};
p.g.Xb = function () {
    throw Error("Placeholder getter");
};
p.g.Yb = function () {
    throw Error("Placeholder setter");
};
function M(a, b, d, c) {
    a.g(b.h.prototype, d, a.i(c, !1), v);
}
function Dc(a, b, d, c) {
    a.g(b.h.prototype, d, a.tb(c), v);
}
function Yc(a) {
    a = a.o[a.o.length - 1].scope;
    if (!a)
        throw Error("No scope found");
    return a;
}
function ea(a, b, d) {
    var c = !1;
    if (d && d.S)
        c = !0;
    else {
        var e = b.body && b.body[0];
        e && e.ja && "Literal" === e.ja.type && "use strict" === e.ja.value && (c = !0);
    }
    e = a.s(null);
    c = new Zc(d, c, e);
    d || ab(a, c.object);
    Ra(a, b, c);
    return c;
}
function $c(a, b, d) {
    if (!b)
        throw Error("parentScope required");
    a = d || a.s(null);
    return new Zc(b, b.S, a);
}
function ad(a, b) {
    for (var d = Yc(a); d && d !== a.O;) {
        if (b in d.object.h)
            return d.object.h[b];
        d = d.Sa;
    }
    if (d === a.O && Xc(a, d.object, b))
        return a.F(d.object, b);
    d = a.o[a.o.length - 1].node;
    "UnaryExpression" === d.type && "typeof" === d.operator || K(a, a.ob, b + " is not defined");
}
function bd(a, b, d) {
    for (var c = Yc(a), e = c.S; c && c !== a.O;) {
        if (b in c.object.h) {
            try {
                c.object.h[b] = d;
            }
            catch (h) {
                e && K(a, a.j, "Cannot assign to read only variable '" + b + "'");
            }
            return;
        }
        c = c.Sa;
    }
    if (c === a.O && (!e || Xc(a, c.object, b)))
        return a.g(c.object, b, d);
    K(a, a.ob, b + " is not defined");
}
function Ra(a, b, d) {
    if (b.ib)
        var c = b.ib;
    else {
        c = Object.create(null);
        switch (b.type) {
            case "VariableDeclaration":
                for (var e = 0; e < b.da.length; e++)
                    c[b.da[e].id.name] = !0;
                break;
            case "FunctionDeclaration":
                c[b.id.name] = b;
                break;
            case "BlockStatement":
            case "CatchClause":
            case "DoWhileStatement":
            case "ForInStatement":
            case "ForStatement":
            case "IfStatement":
            case "LabeledStatement":
            case "Program":
            case "SwitchCase":
            case "SwitchStatement":
            case "TryStatement":
            case "WithStatement":
            case "WhileStatement":
                var h = b.constructor, l;
                for (l in b)
                    if ("loc" !== l) {
                        var q = b[l];
                        if (q && "object" === typeof q)
                            if (Array.isArray(q))
                                for (e = 0; e < q.length; e++) {
                                    if (q[e] && q[e].constructor === h) {
                                        var C = Ra(a, q[e], d);
                                        for (l in C)
                                            c[l] = C[l];
                                    }
                                }
                            else if (q.constructor === h)
                                for (l in C = Ra(a, q, d), C)
                                    c[l] = C[l];
                    }
        }
        b.ib = c;
    }
    for (l in c)
        !0 === c[l] ? a.g(d.object, l, void 0, wa) : a.g(d.object, l, Kb(a, c[l], d), wa);
    return c;
}
function Mb(a) {
    return a.o[a.o.length - 1].isConstructor;
}
function cd(a, b) {
    return b[0] === Ha ? ad(a, b[1]) : a.F(b[0], b[1]);
}
function dd(a, b, d) {
    return b[0] === Ha ? bd(a, b[1], d) : a.g(b[0], b[1], d);
}
function K(a, b, d) {
    if (!a.O)
        throw void 0 === d ? b : d;
    void 0 !== d && b instanceof D && (b = a.ya(b), Fc(a, b, d));
    ed(a, 4, b);
    throw Ga;
}
function ed(a, b, d, c) {
    if (0 === b)
        throw TypeError("Should not unwind for NORMAL completions");
    var e = a.o;
    a: for (; 0 < e.length; e.pop()) {
        var h = e[e.length - 1];
        switch (h.node.type) {
            case "TryStatement":
                h.ca = {
                    type: b,
                    value: d,
                    label: c
                };
                return;
            case "CallExpression":
            case "NewExpression":
                if (3 === b) {
                    h.value = d;
                    return;
                }
                if (4 !== b)
                    throw Error("Unsynatctic break/continue not rejected by Acorn");
                break;
            case "Program":
                h.done = !0;
                break a;
        }
        if (1 === b) {
            if (c ? h.labels && -1 !== h.labels.indexOf(c) : h.U || h.Vb) {
                e.pop();
                return;
            }
        }
        else if (2 === b && (c ? h.labels && -1 !== h.labels.indexOf(c) : h.U))
            return;
    }
    Q(a, d, a.D) ? (b = {
        EvalError: EvalError,
        RangeError: RangeError,
        ReferenceError: ReferenceError,
        SyntaxError: SyntaxError,
        TypeError: TypeError,
        URIError: URIError
    }, c = String(a.F(d, "name")), e = a.F(d, "message").valueOf(), b = (b[c] || Error)(e), b.stack = String(a.F(d, "stack"))) : b = String(d);
    a.value = b;
    throw b;
}
function R(a, b) {
    switch (b.type) {
        case "ArrayExpression":
            return "[...]";
        case "BinaryExpression":
        case "LogicalExpression":
            return R(a, b.left) + " " + b.operator + " " + R(a, b.right);
        case "CallExpression":
            return R(a, b.callee) + "(...)";
        case "ConditionalExpression":
            return R(a, b.test) + " ? " + R(a, b.ba) + " : " + R(a, b.alternate);
        case "Identifier":
            return b.name;
        case "Literal":
            return b.raw;
        case "MemberExpression":
            var d = R(a, b.object);
            a = R(a, b.Ta);
            return b.$a ? d + "[" + a + "]" : d + "." + a;
        case "NewExpression":
            return "new " + R(a, b.callee) + "(...)";
        case "ObjectExpression":
            return "{...}";
        case "ThisExpression":
            return "this";
        case "UnaryExpression":
            return b.operator + " " + R(a, b.J);
        case "UpdateExpression":
            return d = R(a, b.J), b.prefix ? b.operator + d : d + b.operator;
    }
    return "???";
}
function fd(a, b, d) {
    if (!a.P)
        throw Error("Unexpected call to createGetter");
    a.P = !1;
    d = Array.isArray(d) ? d[0] : d;
    var c = a.La();
    c.type = "CallExpression";
    a = new u(c, a.o[a.o.length - 1].scope);
    a.ra = 2;
    a.C = d;
    a.ea = b;
    a.bb = !0;
    a.G = [];
    return a;
}
function gd(a, b, d, c) {
    if (!a.Ia)
        throw Error("Unexpected call to createSetter");
    a.Ia = !1;
    d = Array.isArray(d) ? d[0] : a.Wa;
    var e = a.La();
    e.type = "CallExpression";
    a = new u(e, a.o[a.o.length - 1].scope);
    a.ra = 2;
    a.C = d;
    a.ea = b;
    a.bb = !0;
    a.G = [c];
    return a;
}
function hd(a, b) {
    return void 0 === b || null === b ? a.Wa : b instanceof D ? b : (a = a.s(Nb(a, b)), a.data = b, a);
}
p.Tb = function () {
    return this.O;
};
p.Ub = function () {
    return this.o;
};
p.ac = function (a) {
    this.o = a;
};
function u(a, b) {
    this.node = a;
    this.scope = b;
}
function Zc(a, b, d) {
    this.Sa = a;
    this.S = b;
    this.object = d;
}
function D(a) {
    this.T = Object.create(null);
    this.W = Object.create(null);
    this.h = Object.create(null);
    this.wa = a;
}
p = D.prototype;
p.wa = null;
p.L = "Object";
p.data = null;
p.toString = function () {
    if (!Ma)
        return "[object Interpreter.Object]";
    if (!(this instanceof D))
        return String(this);
    if ("Array" === this.L) {
        var a = Ka;
        a.push(this);
        try {
            var b = [], d = this.h.length, c = !1;
            1024 < d && (d = 1E3, c = !0);
            for (var e = 0; e < d; e++) {
                var h = this.h[e];
                b[e] = h instanceof D && -1 !== a.indexOf(h) ? "..." : h;
            }
            c && b.push("...");
        }
        finally {
            a.pop();
        }
        return b.join(",");
    }
    if ("Error" === this.L) {
        a = Ka;
        if (-1 !== a.indexOf(this))
            return "[object Error]";
        d = this;
        do
            if ("name" in d.h) {
                b = d.h.name;
                break;
            }
        while (d = d.wa);
        d = this;
        do
            if ("message" in d.h) {
                c = d.h.message;
                break;
            }
        while (d = d.wa);
        a.push(this);
        try {
            b = b && String(b), c = c && String(c);
        }
        finally {
            a.pop();
        }
        return c ? b + ": " + c : String(b);
    }
    return null !== this.data ? String(this.data) : "[object " + this.L + "]";
};
p.valueOf = function () {
    return !Ma || void 0 === this.data || null === this.data || this.data instanceof RegExp ? this : this.data instanceof Date ? this.data.valueOf() : this.data;
};
t.prototype.stepArrayExpression = function (a, b, d) {
    d = d.elements;
    var c = b.A || 0;
    b.Ma ? (this.g(b.Ma, c, b.value), c++) : (b.Ma = zc(this), b.Ma.h.length = d.length);
    for (; c < d.length;) {
        if (d[c])
            return b.A = c, new u(d[c], b.scope);
        c++;
    }
    a.pop();
    a[a.length - 1].value = b.Ma;
};
t.prototype.stepAssignmentExpression = function (a, b, d) {
    if (!b.ha)
        return b.ha = !0, b = new u(d.left, b.scope), b.qa = !0, b;
    if (!b.Ba) {
        b.Da || (b.Da = b.value);
        b.za && (b.ka = b.value);
        if (!b.za && "=" !== d.operator && (a = cd(this, b.Da), b.ka = a, this.P))
            return b.za = !0, fd(this, a, b.Da);
        b.Ba = !0;
        "=" === d.operator && "Identifier" === d.left.type && (b.Na = d.left.name);
        return new u(d.right, b.scope);
    }
    if (b.sa)
        a.pop(), a[a.length - 1].value = b.hb;
    else {
        var c = b.ka, e = b.value;
        switch (d.operator) {
            case "=":
                c = e;
                break;
            case "+=":
                c += e;
                break;
            case "-=":
                c -= e;
                break;
            case "*=":
                c *= e;
                break;
            case "/=":
                c /= e;
                break;
            case "%=":
                c %= e;
                break;
            case "<<=":
                c <<= e;
                break;
            case ">>=":
                c >>= e;
                break;
            case ">>>=":
                c >>>= e;
                break;
            case "&=":
                c &= e;
                break;
            case "^=":
                c ^= e;
                break;
            case "|=":
                c |= e;
                break;
            default:
                throw SyntaxError("Unknown assignment expression: " + d.operator);
        }
        if (d = dd(this, b.Da, c))
            return b.sa = !0, b.hb = c, gd(this, d, b.Da, c);
        a.pop();
        a[a.length - 1].value = c;
    }
};
t.prototype.stepBinaryExpression = function (a, b, d) {
    if (!b.ha)
        return b.ha = !0, new u(d.left, b.scope);
    if (!b.Ba)
        return b.Ba = !0, b.ka = b.value, new u(d.right, b.scope);
    a.pop();
    var c = b.ka;
    b = b.value;
    switch (d.operator) {
        case "==":
            d = c == b;
            break;
        case "!=":
            d = c != b;
            break;
        case "===":
            d = c === b;
            break;
        case "!==":
            d = c !== b;
            break;
        case ">":
            d = c > b;
            break;
        case ">=":
            d = c >= b;
            break;
        case "<":
            d = c < b;
            break;
        case "<=":
            d = c <= b;
            break;
        case "+":
            d = c + b;
            break;
        case "-":
            d = c - b;
            break;
        case "*":
            d = c * b;
            break;
        case "/":
            d = c / b;
            break;
        case "%":
            d = c % b;
            break;
        case "&":
            d = c & b;
            break;
        case "|":
            d = c | b;
            break;
        case "^":
            d = c ^ b;
            break;
        case "<<":
            d = c << b;
            break;
        case ">>":
            d = c >> b;
            break;
        case ">>>":
            d = c >>> b;
            break;
        case "in":
            b instanceof D || K(this, this.j, "'in' expects an object, not '" + b + "'");
            d = Xc(this, b, c);
            break;
        case "instanceof":
            Q(this, b, this.N) || K(this, this.j, "'instanceof' expects an object, not '" + b + "'");
            d = c instanceof D ? Q(this, c, b) : !1;
            break;
        default:
            throw SyntaxError("Unknown binary operator: " + d.operator);
    }
    a[a.length - 1].value = d;
};
t.prototype.stepBlockStatement = function (a, b, d) {
    var c = b.A || 0;
    if (d = d.body[c])
        return b.A = c + 1, new u(d, b.scope);
    a.pop();
};
t.prototype.stepBreakStatement = function (a, b, d) {
    ed(this, 1, void 0, d.label && d.label.name);
};
t.prototype.Eb = 0;
t.prototype.stepCallExpression = function (a, b, d) {
    if (!b.ra) {
        b.ra = 1;
        var c = new u(d.callee, b.scope);
        c.qa = !0;
        return c;
    }
    if (1 === b.ra) {
        b.ra = 2;
        var e = b.value;
        if (Array.isArray(e)) {
            if (b.ea = cd(this, e), e[0] === Ha ? b.Lb = "eval" === e[1] : b.C = e[0], e = b.ea, this.P)
                return b.ra = 1, fd(this, e, b.value);
        }
        else
            b.ea = e;
        b.G = [];
        b.A = 0;
    }
    e = b.ea;
    if (!b.bb) {
        0 !== b.A && b.G.push(b.value);
        if (d.arguments[b.A])
            return new u(d.arguments[b.A++], b.scope);
        if ("NewExpression" === d.type) {
            e instanceof D && !e.yb || K(this, this.j, R(this, d.callee) + " is not a constructor");
            if (e === this.oa)
                b.C = zc(this);
            else {
                var h = e.h.prototype;
                if ("object" !== typeof h || null === h)
                    h = this.M;
                b.C = this.s(h);
            }
            b.isConstructor = !0;
        }
        b.bb = !0;
    }
    if (b.cb)
        a.pop(), a[a.length - 1].value = b.isConstructor && "object" !== typeof b.value ? b.C : b.value;
    else {
        b.cb = !0;
        e instanceof D || K(this, this.j, R(this, d.callee) + " is not a function");
        if (a = e.node) {
            d = ea(this, a.body, e.Sa);
            c = zc(this);
            for (e = 0; e < b.G.length; e++)
                this.g(c, e, b.G[e]);
            this.g(d.object, "arguments", c);
            for (e = 0; e < a.ma.length; e++)
                this.g(d.object, a.ma[e].name, b.G.length > e ? b.G[e] : void 0);
            d.S || (b.C = hd(this, b.C));
            this.g(d.object, "this", b.C, ua);
            b.value = void 0;
            return new u(a.body, d);
        }
        if (e.eval) {
            if (e = b.G[0], "string" !== typeof e)
                b.value = e;
            else {
                try {
                    c = da(String(e), "eval" + this.Eb++);
                }
                catch (q) {
                    K(this, this.$, "Invalid code: " + q.message);
                }
                e = this.La();
                e.type = "EvalProgram_";
                e.body = c.body;
                fa(e, d.start, d.end);
                d = b.Lb ? b.scope : this.O;
                d.S ? d = ea(this, c, d) : Ra(this, c, d);
                this.value = void 0;
                return new u(e, d);
            }
        }
        else if (e.Qa)
            b.scope.S || (b.C = hd(this, b.C)), b.value = e.Qa.apply(b.C, b.G);
        else if (e.Xa) {
            var l = this;
            c = e.Xa.length - 1;
            c = b.G.concat(Array(c)).slice(0, c);
            c.push(function (q) {
                b.value = q;
                l.xa = !1;
            });
            this.xa = !0;
            b.scope.S || (b.C = hd(this, b.C));
            e.Xa.apply(b.C, c);
        }
        else
            K(this, this.j, R(this, d.callee) + " is not callable");
    }
};
t.prototype.stepConditionalExpression = function (a, b, d) {
    var c = b.la || 0;
    if (0 === c)
        return b.la = 1, new u(d.test, b.scope);
    if (1 === c) {
        b.la = 2;
        if ((c = !!b.value) && d.ba)
            return new u(d.ba, b.scope);
        if (!c && d.alternate)
            return new u(d.alternate, b.scope);
        this.value = void 0;
    }
    a.pop();
    "ConditionalExpression" === d.type && (a[a.length - 1].value = b.value);
};
t.prototype.stepContinueStatement = function (a, b, d) {
    ed(this, 2, void 0, d.label && d.label.name);
};
t.prototype.stepDebuggerStatement = function (a) {
    a.pop();
};
t.prototype.stepDoWhileStatement = function (a, b, d) {
    "DoWhileStatement" === d.type && void 0 === b.fa && (b.value = !0, b.fa = !0);
    if (!b.fa)
        return b.fa = !0, new u(d.test, b.scope);
    if (!b.value)
        a.pop();
    else if (d.body)
        return b.fa = !1, b.U = !0, new u(d.body, b.scope);
};
t.prototype.stepEmptyStatement = function (a) {
    a.pop();
};
t.prototype.stepEvalProgram_ = function (a, b, d) {
    var c = b.A || 0;
    if (d = d.body[c])
        return b.A = c + 1, new u(d, b.scope);
    a.pop();
    a[a.length - 1].value = this.value;
};
t.prototype.stepExpressionStatement = function (a, b, d) {
    if (!b.ia)
        return this.value = void 0, b.ia = !0, new u(d.ja, b.scope);
    a.pop();
    this.value = b.value;
};
t.prototype.stepForInStatement = function (a, b, d) {
    if (!b.Qb && (b.Qb = !0, d.left.da && d.left.da[0].ta))
        return b.scope.S && K(this, this.$, "for-in loop variable declaration may not have an initializer"), new u(d.left, b.scope);
    if (!b.Aa)
        return b.Aa = !0, b.na || (b.na = b.value), new u(d.right, b.scope);
    b.U || (b.U = !0, b.u = b.value, b.jb = Object.create(null));
    if (void 0 === b.Oa)
        a: for (;;) {
            if (b.u instanceof D)
                for (b.va || (b.va = Object.getOwnPropertyNames(b.u.h));;) {
                    var c = b.va.shift();
                    if (void 0 === c)
                        break;
                    if (Object.prototype.hasOwnProperty.call(b.u.h, c) && !b.jb[c] && (b.jb[c] = !0, Object.prototype.propertyIsEnumerable.call(b.u.h, c))) {
                        b.Oa = c;
                        break a;
                    }
                }
            else if (null !== b.u && void 0 !== b.u)
                for (b.va || (b.va = Object.getOwnPropertyNames(b.u));;) {
                    c = b.va.shift();
                    if (void 0 === c)
                        break;
                    b.jb[c] = !0;
                    if (Object.prototype.propertyIsEnumerable.call(b.u, c)) {
                        b.Oa = c;
                        break a;
                    }
                }
            b.u = Nb(this, b.u);
            b.va = null;
            if (null === b.u) {
                a.pop();
                return;
            }
        }
    if (!b.vb)
        if (b.vb = !0, a = d.left, "VariableDeclaration" === a.type)
            b.na = [Ha, a.da[0].id.name];
        else
            return b.na = null, b = new u(a, b.scope), b.qa = !0, b;
    b.na || (b.na = b.value);
    if (!b.sa && (b.sa = !0, a = b.Oa, c = dd(this, b.na, a)))
        return gd(this, c, b.na, a);
    b.Oa = void 0;
    b.vb = !1;
    b.sa = !1;
    if (d.body)
        return new u(d.body, b.scope);
};
t.prototype.stepForStatement = function (a, b, d) {
    switch (b.la) {
        default:
            b.la = 1;
            if (d.ta)
                return new u(d.ta, b.scope);
            break;
        case 1:
            b.la = 2;
            if (d.test)
                return new u(d.test, b.scope);
            break;
        case 2:
            b.la = 3;
            if (d.test && !b.value)
                a.pop();
            else
                return b.U = !0, new u(d.body, b.scope);
            break;
        case 3:
            if (b.la = 1, d.update)
                return new u(d.update, b.scope);
    }
};
t.prototype.stepFunctionDeclaration = function (a) {
    a.pop();
};
t.prototype.stepFunctionExpression = function (a, b, d) {
    a.pop();
    b = a[a.length - 1];
    a = b.scope;
    d.id && (a = $c(this, a));
    b.value = Kb(this, d, a, b.Na);
    d.id && this.g(a.object, d.id.name, b.value, ua);
};
t.prototype.stepIdentifier = function (a, b, d) {
    a.pop();
    if (b.qa)
        a[a.length - 1].value = [Ha, d.name];
    else {
        b = ad(this, d.name);
        if (this.P)
            return fd(this, b, this.Wa);
        a[a.length - 1].value = b;
    }
};
t.prototype.stepIfStatement = t.prototype.stepConditionalExpression;
t.prototype.stepLabeledStatement = function (a, b, d) {
    a.pop();
    a = b.labels || [];
    a.push(d.label.name);
    b = new u(d.body, b.scope);
    b.labels = a;
    return b;
};
t.prototype.stepLiteral = function (a, b, d) {
    a.pop();
    b = d.value;
    b instanceof RegExp && (d = this.s(this.Ka), Ec(this, d, b), b = d);
    a[a.length - 1].value = b;
};
t.prototype.stepLogicalExpression = function (a, b, d) {
    if ("&&" !== d.operator && "||" !== d.operator)
        throw SyntaxError("Unknown logical operator: " + d.operator);
    if (!b.ha)
        return b.ha = !0, new u(d.left, b.scope);
    if (b.Ba)
        a.pop(), a[a.length - 1].value = b.value;
    else if ("&&" === d.operator && !b.value || "||" === d.operator && b.value)
        a.pop(), a[a.length - 1].value = b.value;
    else
        return b.Ba = !0, new u(d.right, b.scope);
};
t.prototype.stepMemberExpression = function (a, b, d) {
    if (!b.Aa)
        return b.Aa = !0, new u(d.object, b.scope);
    if (d.$a) {
        if (b.Rb)
            d = b.value;
        else
            return b.u = b.value, b.Rb = !0, new u(d.Ta, b.scope);
    }
    else
        b.u = b.value, d = d.Ta.name;
    a.pop();
    if (b.qa)
        a[a.length - 1].value = [b.u, d];
    else {
        d = this.F(b.u, d);
        if (this.P)
            return fd(this, d, b.u);
        a[a.length - 1].value = d;
    }
};
t.prototype.stepNewExpression = t.prototype.stepCallExpression;
t.prototype.stepObjectExpression = function (a, b, d) {
    var c = b.A || 0, e = d.h[c];
    if (b.u) {
        var h = b.Na;
        b.Ha[h] || (b.Ha[h] = {});
        b.Ha[h][e.kind] = b.value;
        b.A = ++c;
        e = d.h[c];
    }
    else
        b.u = this.s(this.M), b.Ha = Object.create(null);
    if (e) {
        var l = e.key;
        if ("Identifier" === l.type)
            h = l.name;
        else if ("Literal" === l.type)
            h = l.value;
        else
            throw SyntaxError("Unknown object structure: " + l.type);
        b.Na = h;
        return new u(e.value, b.scope);
    }
    for (l in b.Ha)
        d = b.Ha[l], "get" in d || "set" in d ? this.g(b.u, l, Ia, {
            configurable: !0,
            enumerable: !0,
            get: d.get,
            set: d.set
        }) : this.g(b.u, l, d.init);
    a.pop();
    a[a.length - 1].value = b.u;
};
t.prototype.stepProgram = function (a, b, d) {
    if (a = d.body.shift())
        return b.done = !1, new u(a, b.scope);
    b.done = !0;
};
t.prototype.stepReturnStatement = function (a, b, d) {
    if (d.J && !b.ia)
        return b.ia = !0, new u(d.J, b.scope);
    ed(this, 3, b.value);
};
t.prototype.stepSequenceExpression = function (a, b, d) {
    var c = b.A || 0;
    if (d = d.wb[c])
        return b.A = c + 1, new u(d, b.scope);
    a.pop();
    a[a.length - 1].value = b.value;
};
t.prototype.stepSwitchStatement = function (a, b, d) {
    if (!b.fa)
        return b.fa = 1, new u(d.Mb, b.scope);
    1 === b.fa && (b.fa = 2, b.cc = b.value, b.ab = -1);
    for (;;) {
        var c = b.fb || 0, e = d.sb[c];
        if (b.Fa || !e || e.test) {
            if (e || b.Fa || -1 === b.ab) {
                if (e) {
                    if (!b.Fa && !b.Cb && e.test)
                        return b.Cb = !0, new u(e.test, b.scope);
                    if (b.Fa || b.value === b.cc) {
                        b.Fa = !0;
                        var h = b.A || 0;
                        if (e.ba[h])
                            return b.Vb = !0, b.A = h + 1, new u(e.ba[h], b.scope);
                    }
                    b.Cb = !1;
                    b.A = 0;
                    b.fb = c + 1;
                }
                else {
                    a.pop();
                    break;
                }
            }
            else
                b.Fa = !0, b.fb = b.ab;
        }
        else
            b.ab = c, b.fb = c + 1;
    }
};
t.prototype.stepThisExpression = function (a) {
    a.pop();
    a[a.length - 1].value = ad(this, "this");
};
t.prototype.stepThrowStatement = function (a, b, d) {
    if (b.ia)
        K(this, b.value);
    else
        return b.ia = !0, new u(d.J, b.scope);
};
t.prototype.stepTryStatement = function (a, b, d) {
    if (!b.Nb)
        return b.Nb = !0, new u(d.block, b.scope);
    if (b.ca && 4 === b.ca.type && !b.Pb && d.Ca)
        return b.Pb = !0, a = $c(this, b.scope), this.g(a.object, d.Ca.Ra.name, b.ca.value), b.ca = void 0, new u(d.Ca.body, a);
    if (!b.Ob && d.eb)
        return b.Ob = !0, new u(d.eb, b.scope);
    a.pop();
    b.ca && ed(this, b.ca.type, b.ca.value, b.ca.label);
};
t.prototype.stepUnaryExpression = function (a, b, d) {
    if (!b.ia)
        return b.ia = !0, a = new u(d.J, b.scope), a.qa = "delete" === d.operator, a;
    a.pop();
    var c = b.value;
    switch (d.operator) {
        case "-":
            c = -c;
            break;
        case "+":
            c = +c;
            break;
        case "!":
            c = !c;
            break;
        case "~":
            c = ~c;
            break;
        case "delete":
            d = !0;
            if (Array.isArray(c)) {
                var e = c[0];
                e === Ha && (e = b.scope);
                c = String(c[1]);
                try {
                    delete e.h[c];
                }
                catch (h) {
                    b.scope.S ? K(this, this.j, "Cannot delete property '" + c + "' of '" + e + "'") : d = !1;
                }
            }
            c = d;
            break;
        case "typeof":
            c = c && "Function" === c.L ? "function" : typeof c;
            break;
        case "void":
            c = void 0;
            break;
        default:
            throw SyntaxError("Unknown unary operator: " + d.operator);
    }
    a[a.length - 1].value = c;
};
t.prototype.stepUpdateExpression = function (a, b, d) {
    if (!b.ha)
        return b.ha = !0, a = new u(d.J, b.scope), a.qa = !0, a;
    b.Ea || (b.Ea = b.value);
    b.za && (b.ka = b.value);
    if (!b.za) {
        var c = cd(this, b.Ea);
        b.ka = c;
        if (this.P)
            return b.za = !0, fd(this, c, b.Ea);
    }
    if (b.sa)
        a.pop(), a[a.length - 1].value = b.hb;
    else {
        c = Number(b.ka);
        if ("++" === d.operator)
            var e = c + 1;
        else if ("--" === d.operator)
            e = c - 1;
        else
            throw SyntaxError("Unknown update expression: " + d.operator);
        d = d.prefix ? e : c;
        if (c = dd(this, b.Ea, e))
            return b.sa = !0, b.hb = d, gd(this, c, b.Ea, e);
        a.pop();
        a[a.length - 1].value = d;
    }
};
t.prototype.stepVariableDeclaration = function (a, b, d) {
    d = d.da;
    var c = b.A || 0, e = d[c];
    b.zb && e && (bd(this, e.id.name, b.value), b.zb = !1, e = d[++c]);
    for (; e;) {
        if (e.ta)
            return b.A = c, b.zb = !0, b.Na = e.id.name, new u(e.ta, b.scope);
        e = d[++c];
    }
    a.pop();
};
t.prototype.stepWithStatement = function (a, b, d) {
    if (!b.Aa)
        return b.Aa = !0, new u(d.object, b.scope);
    a.pop();
    a = $c(this, b.scope, b.value);
    return new u(d.body, a);
};
t.prototype.stepWhileStatement = t.prototype.stepDoWhileStatement;
Na.Interpreter = t;
t.prototype.step = t.prototype.kb;
t.prototype.run = t.prototype.Bb;
t.prototype.appendCode = t.prototype.Gb;
t.prototype.createObject = t.prototype.ya;
t.prototype.createObjectProto = t.prototype.s;
t.prototype.createAsyncFunction = t.prototype.tb;
t.prototype.createNativeFunction = t.prototype.i;
t.prototype.getProperty = t.prototype.F;
t.prototype.setProperty = t.prototype.g;
t.prototype.nativeToPseudo = t.prototype.Ga;
t.prototype.pseudoToNative = t.prototype.R;
t.prototype.getGlobalScope = t.prototype.Tb;
t.prototype.getStateStack = t.prototype.Ub;
t.prototype.setStateStack = t.prototype.ac;
t.VALUE_IN_DESCRIPTOR = Ia;
