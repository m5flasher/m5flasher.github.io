import {
    e,
    _ as t,
    o as i,
    s as r,
    x as o,
    i as s,
    n as a,
    t as n,
    r as l,
    a as d,
    T as c,
    b as h,
    c as p,
    D as f,
    d as u,
    f as m,
    g as v,
    h as g,
    j as y,
    m as b,
    k as _,
    l as x,
    E as w,
    p as E,
    q as k,
    u as A,
    w as S,
    v as R,
    y as T,
    z as I
} from "./styles-ChWDJ3ue.js";
let C;

function B(e, t = P) {
    const i = O(e, t);
    return i && (i.tabIndex = 0, i.focus()), i
}

function $(e, t = P) {
    const i = z(e, t);
    return i && (i.tabIndex = 0, i.focus()), i
}

function L(e, t = P) {
    for (let i = 0; i < e.length; i++) {
        const r = e[i];
        if (0 === r.tabIndex && t(r)) return {
            item: r,
            index: i
        }
    }
    return null
}

function O(e, t = P) {
    for (const i of e)
        if (t(i)) return i;
    return null
}

function z(e, t = P) {
    for (let i = e.length - 1; i >= 0; i--) {
        const r = e[i];
        if (t(r)) return r
    }
    return null
}

function U(e, t, i = P) {
    if (t) {
        const r = function (e, t, i = P) {
            for (let r = 1; r < e.length; r++) {
                const o = e[(r + t) % e.length];
                if (i(o)) return o
            }
            return e[t] ? e[t] : null
        }(e, t.index, i);
        return r && (r.tabIndex = 0, r.focus()), r
    }
    return B(e, i)
}

function D(e, t, i = P) {
    if (t) {
        const r = function (e, t, i = P) {
            for (let r = 1; r < e.length; r++) {
                const o = e[(t - r + e.length) % e.length];
                if (i(o)) return o
            }
            return e[t] ? e[t] : null
        }(e, t.index, i);
        return r && (r.tabIndex = 0, r.focus()), r
    }
    return $(e, i)
}

function P(e) {
    return !e.disabled
}
const F = {
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Home: "Home",
    End: "End"
};
class M {
    constructor(e) {
        this.handleKeydown = e => {
            const t = e.key;
            if (e.defaultPrevented || !this.isNavigableKey(t)) return;
            const i = this.items;
            if (!i.length) return;
            const r = L(i, this.isActivatable);
            r && (r.item.tabIndex = -1), e.preventDefault();
            const o = this.isRtl();
            switch (t) {
            case F.ArrowDown:
            case o ? F.ArrowLeft:
                F.ArrowRight: U(i, r, this.isActivatable);
                break;
            case F.ArrowUp:
            case o ? F.ArrowRight:
                F.ArrowLeft: D(i, r, this.isActivatable);
                break;
            case F.Home:
                B(i, this.isActivatable);
                break;
            case F.End:
                $(i, this.isActivatable)
            }
        }, this.onDeactivateItems = () => {
            const e = this.items;
            for (const t of e) this.deactivateItem(t)
        }, this.onRequestActivation = e => {
            this.onDeactivateItems();
            const t = e.target;
            this.activateItem(t), t.focus()
        }, this.onSlotchange = () => {
            const e = this.items;
            let t = !1;
            for (const i of e) {
                !(!i.disabled && i.tabIndex > -1) || t ? i.tabIndex = -1 : (t = !0, i.tabIndex = 0)
            }
            if (t) return;
            const i = O(e, this.isActivatable);
            i && (i.tabIndex = 0)
        };
        const {
            isItem: t,
            getPossibleItems: i,
            isRtl: r,
            deactivateItem: o,
            activateItem: s,
            isNavigableKey: a,
            isActivatable: n
        } = e;
        this.isItem = t, this.getPossibleItems = i, this.isRtl = r, this.deactivateItem = o, this.activateItem = s, this.isNavigableKey = a, this.isActivatable = n
    }
    get items() {
        const e = this.getPossibleItems(),
            t = [];
        for (const i of e) {
            if (this.isItem(i)) {
                t.push(i);
                continue
            }
            const e = i.item;
            e && this.isItem(e) && t.push(e)
        }
        return t
    }
    activateNextItem() {
        const e = this.items,
            t = L(e, this.isActivatable);
        return t && (t.item.tabIndex = -1), U(e, t, this.isActivatable)
    }
    activatePreviousItem() {
        const e = this.items,
            t = L(e, this.isActivatable);
        return t && (t.item.tabIndex = -1), D(e, t, this.isActivatable)
    }
}
const N = new Set(Object.values(F));
class H extends r {
    get items() {
        return this.listController.items
    }
    constructor() {
        super(), this.listController = new M({
            isItem: e => e.hasAttribute("md-list-item"),
            getPossibleItems: () => this.slotItems,
            isRtl: () => "rtl" === getComputedStyle(this).direction,
            deactivateItem: e => {
                e.tabIndex = -1
            },
            activateItem: e => {
                e.tabIndex = 0
            },
            isNavigableKey: e => N.has(e),
            isActivatable: e => !e.disabled && "text" !== e.type
        }), this.internals = this.attachInternals(), this.internals.role = "list", this.addEventListener("keydown", this.listController.handleKeydown)
    }
    render() {
        return o `
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `
    }
    activateNextItem() {
        return this.listController.activateNextItem()
    }
    activatePreviousItem() {
        return this.listController.activatePreviousItem()
    }
}
t([i({
    flatten: !0
})], H.prototype, "slotItems", void 0);
const q = s `:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;
class W extends H {}
W.styles = [q], customElements.define("ew-list", W);
class Z extends r {
    constructor() {
        super(...arguments), this.multiline = !1
    }
    render() {
        return o `
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `
    }
    handleTextSlotChange() {
        let e = !1,
            t = 0;
        for (const i of this.textSlots)
            if (V(i) && (t += 1), t > 1) {
                e = !0;
                break
            } this.multiline = e
    }
}

function V(e) {
    for (const t of e.assignedNodes({
            flatten: !0
        })) {
        const e = t.nodeType === Node.ELEMENT_NODE,
            i = t.nodeType === Node.TEXT_NODE && t.textContent?.match(/\S/);
        if (e || i) return !0
    }
    return !1
}
t([a({
    type: Boolean,
    reflect: !0
})], Z.prototype, "multiline", void 0), t([function (t) {
    return (i, r) => e(i, r, {
        get() {
            return (this.renderRoot ?? C ?? (C = document.createDocumentFragment())).querySelectorAll(t)
        }
    })
}(".text slot")], Z.prototype, "textSlots", void 0);
const G = s `:host{color:var(--md-sys-color-on-surface, #ffffff);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;
let j = class extends Z {};
j.styles = [G], j = t([n("md-item")], j);
const K = Symbol.for(""),
    Y = e => {
        if (e?.r === K) return e?._$litStatic$
    },
    X = (e, ...t) => ({
        _$litStatic$: t.reduce(((t, i, r) => t + (e => {
            if (void 0 !== e._$litStatic$) return e._$litStatic$;
            throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)
        })(i) + e[r + 1]), e[0]),
        r: K
    }),
    J = new Map,
    Q = (e => (t, ...i) => {
        const r = i.length;
        let o, s;
        const a = [],
            n = [];
        let l, d = 0,
            c = !1;
        for (; d < r;) {
            for (l = t[d]; d < r && void 0 !== (s = i[d], o = Y(s));) l += o + t[++d], c = !0;
            d !== r && n.push(s), a.push(l), d++
        }
        if (d === r && a.push(t[r]), c) {
            const e = a.join("$$lit$$");
            void 0 === (t = J.get(e)) && (a.raw = a, J.set(e, t = a)), i = n
        }
        return e(t, ...i)
    })(o);
class ee extends r {
    constructor() {
        super(...arguments), this.disabled = !1, this.type = "text", this.isListItem = !0, this.href = "", this.target = ""
    }
    get isDisabled() {
        return this.disabled && "link" !== this.type
    }
    willUpdate(e) {
        this.href && (this.type = "link"), super.willUpdate(e)
    }
    render() {
        return this.renderListItem(o `
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)
    }
    renderListItem(e) {
        const t = "link" === this.type;
        let i;
        switch (this.type) {
        case "link":
            i = X `a`;
            break;
        case "button":
            i = X `button`;
            break;
        default:
            i = X `li`
        }
        const r = "text" !== this.type,
            o = t && this.target ? this.target : c;
        return Q `
      <${i}
        id="item"
        tabindex="${this.isDisabled||!r?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||c}
        aria-checked=${this.ariaChecked||c}
        aria-expanded=${this.ariaExpanded||c}
        aria-haspopup=${this.ariaHasPopup||c}
        class="list-item ${h(this.getRenderClasses())}"
        href=${this.href||c}
        target=${o}
        @focus=${this.onFocus}
      >${e}</${i}>
    `
    }
    renderRipple() {
        return "text" === this.type ? c : o ` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`
    }
    renderFocusRing() {
        return "text" === this.type ? c : o ` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`
    }
    onFocusRingVisibilityChanged(e) {}
    getRenderClasses() {
        return {
            disabled: this.isDisabled
        }
    }
    renderBody() {
        return o `
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `
    }
    onFocus() {
        -1 === this.tabIndex && this.dispatchEvent(new Event("request-activation", {
            bubbles: !0,
            composed: !0
        }))
    }
    focus() {
        this.listItemRoot?.focus()
    }
}
l(ee), ee.shadowRootOptions = {
    ...r.shadowRootOptions,
    delegatesFocus: !0
}, t([a({
    type: Boolean,
    reflect: !0
})], ee.prototype, "disabled", void 0), t([a({
    reflect: !0
})], ee.prototype, "type", void 0), t([a({
    type: Boolean,
    attribute: "md-list-item",
    reflect: !0
})], ee.prototype, "isListItem", void 0), t([a()], ee.prototype, "href", void 0), t([a()], ee.prototype, "target", void 0), t([d(".list-item")], ee.prototype, "listItemRoot", void 0);
const te = s `:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #ffffff));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #FF8C00))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;
class ie extends ee {}
ie.styles = [te], customElements.define("ew-list-item", ie);
class re extends f {}
re.styles = [p], customElements.define("ew-divider", re);
const oe = Symbol("createValidator"),
    se = Symbol("getValidityAnchor"),
    ae = Symbol("privateValidator"),
    ne = Symbol("privateSyncValidity"),
    le = Symbol("privateCustomValidationMessage");

function de(e) {
    var t;
    class i extends e {
        constructor() {
            super(...arguments), this[t] = ""
        }
        get validity() {
            return this[ne](), this[u].validity
        }
        get validationMessage() {
            return this[ne](), this[u].validationMessage
        }
        get willValidate() {
            return this[ne](), this[u].willValidate
        }
        checkValidity() {
            return this[ne](), this[u].checkValidity()
        }
        reportValidity() {
            return this[ne](), this[u].reportValidity()
        }
        setCustomValidity(e) {
            this[le] = e, this[ne]()
        }
        requestUpdate(e, t, i) {
            super.requestUpdate(e, t, i), this[ne]()
        }
        firstUpdated(e) {
            super.firstUpdated(e), this[ne]()
        } [(t = le, ne)]() {
            this[ae] || (this[ae] = this[oe]());
            const {
                validity: e,
                validationMessage: t
            } = this[ae].getValidity(), i = !!this[le], r = this[le] || t;
            this[u].setValidity({
                ...e,
                customError: i
            }, r, this[se]() ?? void 0)
        } [oe]() {
            throw new Error("Implement [createValidator]")
        } [se]() {
            throw new Error("Implement [getValidityAnchor]")
        }
    }
    return i
}
const ce = Symbol("getFormValue"),
    he = Symbol("getFormState");

function pe(e) {
    class i extends e {
        get form() {
            return this[u].form
        }
        get labels() {
            return this[u].labels
        }
        get name() {
            return this.getAttribute("name") ?? ""
        }
        set name(e) {
            this.setAttribute("name", e)
        }
        get disabled() {
            return this.hasAttribute("disabled")
        }
        set disabled(e) {
            this.toggleAttribute("disabled", e)
        }
        attributeChangedCallback(e, t, i) {
            if ("name" !== e && "disabled" !== e) super.attributeChangedCallback(e, t, i);
            else {
                const i = "disabled" === e ? null !== t : t;
                this.requestUpdate(e, i)
            }
        }
        requestUpdate(e, t, i) {
            super.requestUpdate(e, t, i), this[u].setFormValue(this[ce](), this[he]())
        } [ce]() {
            throw new Error("Implement [getFormValue]")
        } [he]() {
            return this[ce]()
        }
        formDisabledCallback(e) {
            this.disabled = e
        }
    }
    return i.formAssociated = !0, t([a({
        noAccessor: !0
    })], i.prototype, "name", null), t([a({
        type: Boolean,
        noAccessor: !0
    })], i.prototype, "disabled", null), i
}
class fe {
    constructor(e) {
        this.getCurrentState = e, this.currentValidity = {
            validity: {},
            validationMessage: ""
        }
    }
    getValidity() {
        const e = this.getCurrentState();
        if (!(!this.prevState || !this.equals(this.prevState, e))) return this.currentValidity;
        const {
            validity: t,
            validationMessage: i
        } = this.computeValidity(e);
        return this.prevState = this.copy(e), this.currentValidity = {
            validationMessage: i,
            validity: {
                badInput: t.badInput,
                customError: t.customError,
                patternMismatch: t.patternMismatch,
                rangeOverflow: t.rangeOverflow,
                rangeUnderflow: t.rangeUnderflow,
                stepMismatch: t.stepMismatch,
                tooLong: t.tooLong,
                tooShort: t.tooShort,
                typeMismatch: t.typeMismatch,
                valueMissing: t.valueMissing
            }
        }, this.currentValidity
    }
}
class ue extends fe {
    computeValidity(e) {
        return this.checkboxControl || (this.checkboxControl = document.createElement("input"), this.checkboxControl.type = "checkbox"), this.checkboxControl.checked = e.checked, this.checkboxControl.required = e.required, {
            validity: this.checkboxControl.validity,
            validationMessage: this.checkboxControl.validationMessage
        }
    }
    equals(e, t) {
        return e.checked === t.checked && e.required === t.required
    }
    copy({
        checked: e,
        required: t
    }) {
        return {
            checked: e,
            required: t
        }
    }
}
const me = de(pe(b(r)));
class ve extends me {
    constructor() {
        super(), this.checked = !1, this.indeterminate = !1, this.required = !1, this.value = "on", this.prevChecked = !1, this.prevDisabled = !1, this.prevIndeterminate = !1, this.addEventListener("click", (e => {
            v(e) && this.input && (this.focus(), g(this.input))
        }))
    }
    update(e) {
        (e.has("checked") || e.has("disabled") || e.has("indeterminate")) && (this.prevChecked = e.get("checked") ?? this.checked, this.prevDisabled = e.get("disabled") ?? this.disabled, this.prevIndeterminate = e.get("indeterminate") ?? this.indeterminate), super.update(e)
    }
    render() {
        const e = !this.prevChecked && !this.prevIndeterminate,
            t = this.prevChecked && !this.prevIndeterminate,
            i = this.prevIndeterminate,
            r = this.checked && !this.indeterminate,
            s = this.indeterminate,
            a = h({
                disabled: this.disabled,
                selected: r || s,
                unselected: !r && !s,
                checked: r,
                indeterminate: s,
                "prev-unselected": e,
                "prev-checked": t,
                "prev-indeterminate": i,
                "prev-disabled": this.prevDisabled
            }),
            {
                ariaLabel: n,
                ariaInvalid: l
            } = this;
        return o `
      <div class="container ${a}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${s?"mixed":c}
          aria-label=${n||c}
          aria-invalid=${l||c}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `
    }
    handleInput(e) {
        const t = e.target;
        this.checked = t.checked, this.indeterminate = t.indeterminate
    }
    handleChange(e) {
        y(this, e)
    } [ce]() {
        return !this.checked || this.indeterminate ? null : this.value
    } [he]() {
        return String(this.checked)
    }
    formResetCallback() {
        this.checked = this.hasAttribute("checked")
    }
    formStateRestoreCallback(e) {
        this.checked = "true" === e
    } [oe]() {
        return new ue((() => this))
    } [se]() {
        return this.input
    }
}
l(ve), ve.shadowRootOptions = {
    ...r.shadowRootOptions,
    delegatesFocus: !0
}, t([a({
    type: Boolean
})], ve.prototype, "checked", void 0), t([a({
    type: Boolean
})], ve.prototype, "indeterminate", void 0), t([a({
    type: Boolean
})], ve.prototype, "required", void 0), t([a()], ve.prototype, "value", void 0), t([m()], ve.prototype, "prevChecked", void 0), t([m()], ve.prototype, "prevDisabled", void 0), t([m()], ve.prototype, "prevIndeterminate", void 0), t([d("input")], ve.prototype, "input", void 0);
const ge = s `:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, 9999px);height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #ffffff));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #ffffff));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #ffffff));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #ffffff));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #ffffff));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;
class ye extends ve {}
ye.styles = [ge], customElements.define("ew-checkbox", ye);
class be {
    constructor(e) {
        this.targetElement = e, this.state = {
            bold: !1,
            italic: !1,
            underline: !1,
            strikethrough: !1,
            foregroundColor: null,
            backgroundColor: null,
            carriageReturn: !1,
            secret: !1
        }
    }
    logs() {
        return this.targetElement.innerText
    }
    addLine(e) {
        const t = /(?:\033|\\033)(?:\[(.*?)[@-~]|\].*?(?:\007|\033\\))/g;
        let i = 0;
        this.state.carriageReturn && ("\n" !== e && this.targetElement.removeChild(this.targetElement.lastChild), this.state.carriageReturn = !1), e.includes("\r") && (this.state.carriageReturn = !0);
        const r = document.createElement("span");
        r.classList.add("line"), this.targetElement.appendChild(r);
        const o = e => {
            if ("" === e) return;
            const t = document.createElement("span");
            if (this.state.bold && t.classList.add("log-bold"), this.state.italic && t.classList.add("log-italic"), this.state.underline && t.classList.add("log-underline"), this.state.strikethrough && t.classList.add("log-strikethrough"), this.state.secret && t.classList.add("log-secret"), null !== this.state.foregroundColor && t.classList.add(`log-fg-${this.state.foregroundColor}`), null !== this.state.backgroundColor && t.classList.add(`log-bg-${this.state.backgroundColor}`), t.appendChild(document.createTextNode(e)), r.appendChild(t), this.state.secret) {
                const e = document.createElement("span");
                e.classList.add("log-secret-redacted"), e.appendChild(document.createTextNode("[redacted]")), r.appendChild(e)
            }
        };
        for (;;) {
            const r = t.exec(e);
            if (null === r) break;
            const s = r.index;
            if (o(e.substring(i, s)), i = s + r[0].length, void 0 !== r[1])
                for (const e of r[1].split(";")) switch (parseInt(e)) {
                case 0:
                    this.state.bold = !1, this.state.italic = !1, this.state.underline = !1, this.state.strikethrough = !1, this.state.foregroundColor = null, this.state.backgroundColor = null, this.state.secret = !1;
                    break;
                case 1:
                    this.state.bold = !0;
                    break;
                case 3:
                    this.state.italic = !0;
                    break;
                case 4:
                    this.state.underline = !0;
                    break;
                case 5:
                    this.state.secret = !0;
                    break;
                case 6:
                    this.state.secret = !1;
                    break;
                case 9:
                    this.state.strikethrough = !0;
                    break;
                case 22:
                    this.state.bold = !1;
                    break;
                case 23:
                    this.state.italic = !1;
                    break;
                case 24:
                    this.state.underline = !1;
                    break;
                case 29:
                    this.state.strikethrough = !1;
                    break;
                case 30:
                    this.state.foregroundColor = "black";
                    break;
                case 31:
                    this.state.foregroundColor = "red";
                    break;
                case 32:
                    this.state.foregroundColor = "green";
                    break;
                case 33:
                    this.state.foregroundColor = "yellow";
                    break;
                case 34:
                    this.state.foregroundColor = "blue";
                    break;
                case 35:
                    this.state.foregroundColor = "magenta";
                    break;
                case 36:
                    this.state.foregroundColor = "cyan";
                    break;
                case 37:
                    this.state.foregroundColor = "white";
                    break;
                case 39:
                    this.state.foregroundColor = null;
                    break;
                case 41:
                    this.state.backgroundColor = "red";
                    break;
                case 42:
                    this.state.backgroundColor = "green";
                    break;
                case 43:
                    this.state.backgroundColor = "yellow";
                    break;
                case 44:
                    this.state.backgroundColor = "blue";
                    break;
                case 45:
                    this.state.backgroundColor = "magenta";
                    break;
                case 46:
                    this.state.backgroundColor = "cyan";
                    break;
                case 47:
                    this.state.backgroundColor = "white";
                    break;
                case 40:
                case 49:
                    this.state.backgroundColor = null
                }
        }
        const s = this.targetElement.scrollTop > this.targetElement.scrollHeight - this.targetElement.offsetHeight - 50;
        o(e.substring(i)), s && (this.targetElement.scrollTop = this.targetElement.scrollHeight)
    }
}
const _e = e => new Promise((t => setTimeout(t, e)));
class xe {
    constructor() {
        this.chunks = ""
    }
    transform(e, t) {
        this.chunks += e;
        const i = this.chunks.split("\r\n");
        this.chunks = i.pop(), i.forEach((e => t.enqueue(e + "\r\n")))
    }
    flush(e) {
        e.enqueue(this.chunks)
    }
}
class we extends HTMLElement {
    constructor() {
        super(...arguments), this.allowInput = !0
    }
    logs() {
        var e;
        return (null === (e = this._console) || void 0 === e ? void 0 : e.logs()) || ""
    }
    connectedCallback() {
        if (this._console) return;
        if (this.attachShadow({
                mode: "open"
            }).innerHTML = `\n      <style>\n        :host, input {\n          background-color: #1c1c1c;\n          color: #ddd;\n          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n            monospace;\n          line-height: 1.45;\n          display: flex;\n          flex-direction: column;\n        }\n        form {\n          display: flex;\n          align-items: center;\n          padding: 0 8px 0 16px;\n        }\n        input {\n          flex: 1;\n          padding: 4px;\n          margin: 0 8px;\n          border: 0;\n          outline: none;\n        }\n        \n  .log {\n    flex: 1;\n    background-color: #1c1c1c;\n    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n      monospace;\n    font-size: 12px;\n    padding: 16px;\n    overflow: auto;\n    line-height: 1.45;\n    border-radius: 3px;\n    white-space: pre-wrap;\n    overflow-wrap: break-word;\n    color: #ddd;\n  }\n\n  .log-bold {\n    font-weight: bold;\n  }\n  .log-italic {\n    font-style: italic;\n  }\n  .log-underline {\n    text-decoration: underline;\n  }\n  .log-strikethrough {\n    text-decoration: line-through;\n  }\n  .log-underline.log-strikethrough {\n    text-decoration: underline line-through;\n  }\n  .log-secret {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .log-secret-redacted {\n    opacity: 0;\n    width: 1px;\n    font-size: 1px;\n  }\n  .log-fg-black {\n    color: rgb(128, 128, 128);\n  }\n  .log-fg-red {\n    color: rgb(255, 0, 0);\n  }\n  .log-fg-green {\n    color: rgb(0, 255, 0);\n  }\n  .log-fg-yellow {\n    color: rgb(255, 255, 0);\n  }\n  .log-fg-blue {\n    color: rgb(0, 0, 255);\n  }\n  .log-fg-magenta {\n    color: rgb(255, 0, 255);\n  }\n  .log-fg-cyan {\n    color: rgb(0, 255, 255);\n  }\n  .log-fg-white {\n    color: rgb(187, 187, 187);\n  }\n  .log-bg-black {\n    background-color: rgb(0, 0, 0);\n  }\n  .log-bg-red {\n    background-color: rgb(255, 0, 0);\n  }\n  .log-bg-green {\n    background-color: rgb(0, 255, 0);\n  }\n  .log-bg-yellow {\n    background-color: rgb(255, 255, 0);\n  }\n  .log-bg-blue {\n    background-color: rgb(0, 0, 255);\n  }\n  .log-bg-magenta {\n    background-color: rgb(255, 0, 255);\n  }\n  .log-bg-cyan {\n    background-color: rgb(0, 255, 255);\n  }\n  .log-bg-white {\n    background-color: rgb(255, 255, 255);\n  }\n\n      </style>\n      <div class="log"></div>\n      ${this.allowInput?"<form>\n                >\n                <input autofocus>\n              </form>\n            ":""}\n    `, this._console = new be(this.shadowRoot.querySelector("div")), this.allowInput) {
            const e = this.shadowRoot.querySelector("input");
            this.addEventListener("click", (() => {
                var t;
                "" === (null === (t = getSelection()) || void 0 === t ? void 0 : t.toString()) && e.focus()
            })), e.addEventListener("keydown", (e => {
                "Enter" === e.key && (e.preventDefault(), e.stopPropagation(), this._sendCommand())
            }))
        }
        const e = new AbortController,
            t = this._connect(e.signal);
        this._cancelConnection = () => (e.abort(), t)
    }
    async _connect(e) {
        this.logger.debug("Starting console read loop");
        try {
            await this.port.readable.pipeThrough(new TextDecoderStream, {
                signal: e
            }).pipeThrough(new TransformStream(new xe)).pipeTo(new WritableStream({
                write: e => {
                    this._console.addLine(e.replace("\r", ""))
                }
            })), e.aborted || (this._console.addLine(""), this._console.addLine(""), this._console.addLine("Terminal disconnected"))
        } catch (e) {
            this._console.addLine(""), this._console.addLine(""), this._console.addLine(`Terminal disconnected: ${e}`)
        } finally {
            await _e(100), this.logger.debug("Finished console read loop")
        }
    }
    async _sendCommand() {
        const e = this.shadowRoot.querySelector("input"),
            t = e.value,
            i = new TextEncoder,
            r = this.port.writable.getWriter();
        await r.write(i.encode(t + "\r\n")), this._console.addLine(`> ${t}\r\n`), e.value = "", e.focus();
        try {
            r.releaseLock()
        } catch (e) {
            console.error("Ignoring release lock error", e)
        }
    }
    async disconnect() {
        this._cancelConnection && (await this._cancelConnection(), this._cancelConnection = void 0)
    }
    async reset() {
        this.logger.debug("Triggering reset"), await this.port.setSignals({
            dataTerminalReady: !1,
            requestToSend: !0
        }), await _e(250), await this.port.setSignals({
            dataTerminalReady: !1,
            requestToSend: !1
        }), await _e(250), await new Promise((e => setTimeout(e, 1e3)))
    }
}

function Ee(e, t = !0) {
    return t && "rtl" === getComputedStyle(e).getPropertyValue("direction").trim()
}
customElements.define("ewt-console", we);
const ke = b(r);
class Ae extends ke {
    constructor() {
        super(...arguments), this.disabled = !1, this.flipIconInRtl = !1, this.href = "", this.target = "", this.ariaLabelSelected = "", this.toggle = !1, this.selected = !1, this.type = "submit", this.value = "", this.flipIcon = Ee(this, this.flipIconInRtl)
    }
    get name() {
        return this.getAttribute("name") ?? ""
    }
    set name(e) {
        this.setAttribute("name", e)
    }
    get form() {
        return this[u].form
    }
    get labels() {
        return this[u].labels
    }
    willUpdate() {
        this.href && (this.disabled = !1)
    }
    render() {
        const e = this.href ? X `div` : X `button`,
            {
                ariaLabel: t,
                ariaHasPopup: i,
                ariaExpanded: r
            } = this,
            o = t && this.ariaLabelSelected,
            s = this.toggle ? this.selected : c;
        let a = c;
        return this.href || (a = o && this.selected ? this.ariaLabelSelected : t), Q `<${e}
        class="icon-button ${h(this.getRenderClasses())}"
        id="button"
        aria-label="${a||c}"
        aria-haspopup="${!this.href&&i||c}"
        aria-expanded="${!this.href&&r||c}"
        aria-pressed="${s}"
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?c:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():c}
        ${this.renderTouchTarget()}
        ${this.href&&this.renderLink()}
  </${e}>`
    }
    renderLink() {
        const {
            ariaLabel: e
        } = this;
        return o `
      <a
        class="link"
        id="link"
        href="${this.href}"
        target="${this.target||c}"
        aria-label="${e||c}"></a>
    `
    }
    getRenderClasses() {
        return {
            "flip-icon": this.flipIcon,
            selected: this.toggle && this.selected
        }
    }
    renderIcon() {
        return o `<span class="icon"><slot></slot></span>`
    }
    renderSelectedIcon() {
        return o `<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`
    }
    renderTouchTarget() {
        return o `<span class="touch"></span>`
    }
    renderFocusRing() {
        return o `<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`
    }
    renderRipple() {
        return o `<md-ripple
      for=${this.href?"link":c}
      ?disabled="${!this.href&&this.disabled}"></md-ripple>`
    }
    connectedCallback() {
        this.flipIcon = Ee(this, this.flipIconInRtl), super.connectedCallback()
    }
    async handleClick(e) {
        await 0, !this.toggle || this.disabled || e.defaultPrevented || (this.selected = !this.selected, this.dispatchEvent(new InputEvent("input", {
            bubbles: !0,
            composed: !0
        })), this.dispatchEvent(new Event("change", {
            bubbles: !0
        })))
    }
}
l(Ae), _(Ae), Ae.formAssociated = !0, Ae.shadowRootOptions = {
    mode: "open",
    delegatesFocus: !0
}, t([a({
    type: Boolean,
    reflect: !0
})], Ae.prototype, "disabled", void 0), t([a({
    type: Boolean,
    attribute: "flip-icon-in-rtl"
})], Ae.prototype, "flipIconInRtl", void 0), t([a()], Ae.prototype, "href", void 0), t([a()], Ae.prototype, "target", void 0), t([a({
    attribute: "aria-label-selected"
})], Ae.prototype, "ariaLabelSelected", void 0), t([a({
    type: Boolean
})], Ae.prototype, "toggle", void 0), t([a({
    type: Boolean,
    reflect: !0
})], Ae.prototype, "selected", void 0), t([a()], Ae.prototype, "type", void 0), t([a({
    reflect: !0
})], Ae.prototype, "value", void 0), t([m()], Ae.prototype, "flipIcon", void 0);
const Se = s `:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:none;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host([disabled]){--_disabled-icon-opacity: 1}}
`,
    Re = s `:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #ff8с00));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, 9999px);--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:disabled{color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:disabled .icon{opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}
`;
class Te extends Ae {}
Te.styles = [Se, Re], customElements.define("ew-icon-button", Te);
const Ie = s `:host{--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_container-shape-start-start: var( --md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, 4px) );--_container-shape-start-end: var( --md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, 4px) );--_container-shape-end-end: var( --md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, 0px) );--_container-shape-end-start: var( --md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, 0px) );--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space)}
`;
class Ce extends r {
    constructor() {
        super(...arguments), this.disabled = !1, this.error = !1, this.focused = !1, this.label = "", this.populated = !1, this.required = !1, this.resizable = !1, this.supportingText = "", this.errorText = "", this.count = -1, this.max = -1, this.hasStart = !1, this.hasEnd = !1, this.isAnimating = !1, this.refreshErrorAlert = !1, this.disableTransitions = !1
    }
    get counterText() {
        const e = this.count ?? -1,
            t = this.max ?? -1;
        return e < 0 || t <= 0 ? "" : `${e} / ${t}`
    }
    get supportingOrErrorText() {
        return this.error && this.errorText ? this.errorText : this.supportingText
    }
    reannounceError() {
        this.refreshErrorAlert = !0
    }
    update(e) {
        e.has("disabled") && void 0 !== e.get("disabled") && (this.disableTransitions = !0), this.disabled && this.focused && (e.set("focused", !0), this.focused = !1), this.animateLabelIfNeeded({
            wasFocused: e.get("focused"),
            wasPopulated: e.get("populated")
        }), super.update(e)
    }
    render() {
        const e = this.renderLabel(!0),
            t = this.renderLabel(!1),
            i = this.renderOutline?.(e),
            r = {
                disabled: this.disabled,
                "disable-transitions": this.disableTransitions,
                error: this.error && !this.disabled,
                focused: this.focused,
                "with-start": this.hasStart,
                "with-end": this.hasEnd,
                populated: this.populated,
                resizable: this.resizable,
                required: this.required,
                "no-label": !this.label
            };
        return o `
      <div class="field ${h(r)}">
        <div class="container-overflow">
          ${this.renderBackground?.()} ${this.renderIndicator?.()} ${i}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${i?c:e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `
    }
    updated(e) {
        (e.has("supportingText") || e.has("errorText") || e.has("count") || e.has("max")) && this.updateSlottedAriaDescribedBy(), this.refreshErrorAlert && requestAnimationFrame((() => {
            this.refreshErrorAlert = !1
        })), this.disableTransitions && requestAnimationFrame((() => {
            this.disableTransitions = !1
        }))
    }
    renderSupportingText() {
        const {
            supportingOrErrorText: e,
            counterText: t
        } = this;
        if (!e && !t) return c;
        const i = o `<span>${e}</span>`,
            r = t ? o `<span class="counter">${t}</span>` : c,
            s = this.error && this.errorText && !this.refreshErrorAlert;
        return o `
      <div class="supporting-text" role=${s?"alert":c}>${i}${r}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `
    }
    updateSlottedAriaDescribedBy() {
        for (const e of this.slottedAriaDescribedBy) x(o `${this.supportingOrErrorText} ${this.counterText}`, e), e.setAttribute("hidden", "")
    }
    renderLabel(e) {
        if (!this.label) return c;
        let t;
        t = e ? this.focused || this.populated || this.isAnimating : !this.focused && !this.populated && !this.isAnimating;
        const i = {
                hidden: !t,
                floating: e,
                resting: !e
            },
            r = `${this.label}${this.required?"*":""}`;
        return o `
      <span class="label ${h(i)}" aria-hidden=${!t}
        >${r}</span
      >
    `
    }
    animateLabelIfNeeded({
        wasFocused: e,
        wasPopulated: t
    }) {
        if (!this.label) return;
        e ?? (e = this.focused), t ?? (t = this.populated);
        (e || t) !== (this.focused || this.populated) && (this.isAnimating = !0, this.labelAnimation?.cancel(), this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), {
            duration: 150,
            easing: w.STANDARD
        }), this.labelAnimation?.addEventListener("finish", (() => {
            this.isAnimating = !1
        })))
    }
    getLabelKeyframes() {
        const {
            floatingLabelEl: e,
            restingLabelEl: t
        } = this;
        if (!e || !t) return [];
        const {
            x: i,
            y: r,
            height: o
        } = e.getBoundingClientRect(), {
            x: s,
            y: a,
            height: n
        } = t.getBoundingClientRect(), l = e.scrollWidth, d = t.scrollWidth, c = d / l, h = `translateX(${s-i}px) translateY(${a-r+Math.round((n-o*c)/2)}px) scale(${c})`, p = "translateX(0) translateY(0) scale(1)", f = t.clientWidth, u = d > f ? f / c + "px" : "";
        return this.focused || this.populated ? [{
            transform: h,
            width: u
        }, {
            transform: p,
            width: u
        }] : [{
            transform: p,
            width: u
        }, {
            transform: h,
            width: u
        }]
    }
    getSurfacePositionClientRect() {
        return this.containerEl.getBoundingClientRect()
    }
}
t([a({
    type: Boolean
})], Ce.prototype, "disabled", void 0), t([a({
    type: Boolean
})], Ce.prototype, "error", void 0), t([a({
    type: Boolean
})], Ce.prototype, "focused", void 0), t([a()], Ce.prototype, "label", void 0), t([a({
    type: Boolean
})], Ce.prototype, "populated", void 0), t([a({
    type: Boolean
})], Ce.prototype, "required", void 0), t([a({
    type: Boolean
})], Ce.prototype, "resizable", void 0), t([a({
    attribute: "supporting-text"
})], Ce.prototype, "supportingText", void 0), t([a({
    attribute: "error-text"
})], Ce.prototype, "errorText", void 0), t([a({
    type: Number
})], Ce.prototype, "count", void 0), t([a({
    type: Number
})], Ce.prototype, "max", void 0), t([a({
    type: Boolean,
    attribute: "has-start"
})], Ce.prototype, "hasStart", void 0), t([a({
    type: Boolean,
    attribute: "has-end"
})], Ce.prototype, "hasEnd", void 0), t([i({
    slot: "aria-describedby"
})], Ce.prototype, "slottedAriaDescribedBy", void 0), t([m()], Ce.prototype, "isAnimating", void 0), t([m()], Ce.prototype, "refreshErrorAlert", void 0), t([m()], Ce.prototype, "disableTransitions", void 0), t([d(".label.floating")], Ce.prototype, "floatingLabelEl", void 0), t([d(".label.resting")], Ce.prototype, "restingLabelEl", void 0), t([d(".container")], Ce.prototype, "containerEl", void 0);
class Be extends Ce {
    renderBackground() {
        return o `
      <div class="background"></div>
      <div class="state-layer"></div>
    `
    }
    renderIndicator() {
        return o `<div class="active-indicator"></div>`
    }
}
const $e = s `@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_container-shape-start-start: var( --md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, 4px) );--_container-shape-start-end: var( --md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, 4px) );--_container-shape-end-end: var( --md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, 0px) );--_container-shape-end-start: var( --md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, 0px) );--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #ffffff));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #ffffff));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #ffffff));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #ffffff));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #ffffff));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #ffffff));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px)}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`,
    Le = s `:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;
let Oe = class extends Be {};
Oe.styles = [Le, $e], Oe = t([n("md-filled-field")], Oe);
const ze = {},
    Ue = E(class extends k {
        constructor(e) {
            if (super(e), e.type !== A.PROPERTY && e.type !== A.ATTRIBUTE && e.type !== A.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
            if (!(e => void 0 === e.strings)(e)) throw Error("`live` bindings can only contain a single expression")
        }
        render(e) {
            return e
        }
        update(e, [t]) {
            if (t === S || t === c) return t;
            const i = e.element,
                r = e.name;
            if (e.type === A.PROPERTY) {
                if (t === i[r]) return S
            } else if (e.type === A.BOOLEAN_ATTRIBUTE) {
                if (!!t === i.hasAttribute(r)) return S
            } else if (e.type === A.ATTRIBUTE && i.getAttribute(r) === t + "") return S;
            return ((e, t = ze) => {
                e._$AH = t
            })(e), t
        }
    }),
    De = "important",
    Pe = " !" + De,
    Fe = E(class extends k {
        constructor(e) {
            if (super(e), e.type !== A.ATTRIBUTE || "style" !== e.name || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")
        }
        render(e) {
            return Object.keys(e).reduce(((t, i) => {
                const r = e[i];
                return null == r ? t : t + `${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`
            }), "")
        }
        update(e, [t]) {
            const {
                style: i
            } = e.element;
            if (void 0 === this.ft) return this.ft = new Set(Object.keys(t)), this.render(t);
            for (const e of this.ft) null == t[e] && (this.ft.delete(e), e.includes("-") ? i.removeProperty(e) : i[e] = null);
            for (const e in t) {
                const r = t[e];
                if (null != r) {
                    this.ft.add(e);
                    const t = "string" == typeof r && r.endsWith(Pe);
                    e.includes("-") || t ? i.setProperty(e, t ? r.slice(0, -11) : r, t ? De : "") : i[e] = r
                }
            }
            return S
        }
    }),
    Me = {
        fromAttribute: e => e ?? "",
        toAttribute: e => e || null
    },
    Ne = Symbol("onReportValidity"),
    He = Symbol("privateCleanupFormListeners"),
    qe = Symbol("privateDoNotReportInvalid"),
    We = Symbol("privateIsSelfReportingValidity"),
    Ze = Symbol("privateCallOnReportValidity");

function Ve(e) {
    var t, i, r;
    class o extends e {
        constructor(...e) {
            super(...e), this[t] = new AbortController, this[i] = !1, this[r] = !1, this.addEventListener("invalid", (e => {
                !this[qe] && e.isTrusted && this.addEventListener("invalid", (() => {
                    this[Ze](e)
                }), {
                    once: !0
                })
            }), {
                capture: !0
            })
        }
        checkValidity() {
            this[qe] = !0;
            const e = super.checkValidity();
            return this[qe] = !1, e
        }
        reportValidity() {
            this[We] = !0;
            const e = super.reportValidity();
            return e && this[Ze](null), this[We] = !1, e
        } [(t = He, i = qe, r = We, Ze)](e) {
            const t = e?.defaultPrevented;
            if (t) return;
            this[Ne](e);
            !t && e?.defaultPrevented && (this[We] || function (e, t) {
                if (!e) return !0;
                let i;
                for (const t of e.elements)
                    if (t.matches(":invalid")) {
                        i = t;
                        break
                    } return i === t
            }(this[u].form, this)) && this.focus()
        } [Ne](e) {
            throw new Error("Implement [onReportValidity]")
        }
        formAssociatedCallback(e) {
            super.formAssociatedCallback && super.formAssociatedCallback(e), this[He].abort(), e && (this[He] = new AbortController, function (e, t, i, r) {
                const o = function (e) {
                    if (!Ge.has(e)) {
                        const t = new EventTarget;
                        Ge.set(e, t);
                        for (const i of ["reportValidity", "requestSubmit"]) {
                            const r = e[i];
                            e[i] = function () {
                                t.dispatchEvent(new Event("before"));
                                const e = Reflect.apply(r, this, arguments);
                                return t.dispatchEvent(new Event("after")), e
                            }
                        }
                    }
                    return Ge.get(e)
                }(t);
                let s, a = !1,
                    n = !1;
                o.addEventListener("before", (() => {
                    n = !0, s = new AbortController, a = !1, e.addEventListener("invalid", (() => {
                        a = !0
                    }), {
                        signal: s.signal
                    })
                }), {
                    signal: r
                }), o.addEventListener("after", (() => {
                    n = !1, s?.abort(), a || i()
                }), {
                    signal: r
                }), t.addEventListener("submit", (() => {
                    n || i()
                }), {
                    signal: r
                })
            }(this, e, (() => {
                this[Ze](null)
            }), this[He].signal))
        }
    }
    return o
}
const Ge = new WeakMap;
class je extends fe {
    computeValidity({
        state: e,
        renderedControl: t
    }) {
        let i = t;
        Ke(e) && !i ? (i = this.inputControl || document.createElement("input"), this.inputControl = i) : i || (i = this.textAreaControl || document.createElement("textarea"), this.textAreaControl = i);
        const r = Ke(e) ? i : null;
        if (r && (r.type = e.type), i.value !== e.value && (i.value = e.value), i.required = e.required, r) {
            const t = e;
            t.pattern ? r.pattern = t.pattern : r.removeAttribute("pattern"), t.min ? r.min = t.min : r.removeAttribute("min"), t.max ? r.max = t.max : r.removeAttribute("max"), t.step ? r.step = t.step : r.removeAttribute("step")
        }
        return (e.minLength ?? -1) > -1 ? i.setAttribute("minlength", String(e.minLength)) : i.removeAttribute("minlength"), (e.maxLength ?? -1) > -1 ? i.setAttribute("maxlength", String(e.maxLength)) : i.removeAttribute("maxlength"), {
            validity: i.validity,
            validationMessage: i.validationMessage
        }
    }
    equals({
        state: e
    }, {
        state: t
    }) {
        const i = e.type === t.type && e.value === t.value && e.required === t.required && e.minLength === t.minLength && e.maxLength === t.maxLength;
        return Ke(e) && Ke(t) ? i && e.pattern === t.pattern && e.min === t.min && e.max === t.max && e.step === t.step : i
    }
    copy({
        state: e
    }) {
        return {
            state: Ke(e) ? this.copyInput(e) : this.copyTextArea(e),
            renderedControl: null
        }
    }
    copyInput(e) {
        const {
            type: t,
            pattern: i,
            min: r,
            max: o,
            step: s
        } = e;
        return {
            ...this.copySharedState(e),
            type: t,
            pattern: i,
            min: r,
            max: o,
            step: s
        }
    }
    copyTextArea(e) {
        return {
            ...this.copySharedState(e),
            type: e.type
        }
    }
    copySharedState({
        value: e,
        required: t,
        minLength: i,
        maxLength: r
    }) {
        return {
            value: e,
            required: t,
            minLength: i,
            maxLength: r
        }
    }
}

function Ke(e) {
    return "textarea" !== e.type
}
const Ye = Ve(de(pe(b(r))));
class Xe extends Ye {
    constructor() {
        super(...arguments), this.error = !1, this.errorText = "", this.label = "", this.required = !1, this.value = "", this.prefixText = "", this.suffixText = "", this.hasLeadingIcon = !1, this.hasTrailingIcon = !1, this.supportingText = "", this.textDirection = "", this.rows = 2, this.cols = 20, this.inputMode = "", this.max = "", this.maxLength = -1, this.min = "", this.minLength = -1, this.noSpinner = !1, this.pattern = "", this.placeholder = "", this.readOnly = !1, this.multiple = !1, this.step = "", this.type = "text", this.autocomplete = "", this.dirty = !1, this.focused = !1, this.nativeError = !1, this.nativeErrorText = ""
    }
    get selectionDirection() {
        return this.getInputOrTextarea().selectionDirection
    }
    set selectionDirection(e) {
        this.getInputOrTextarea().selectionDirection = e
    }
    get selectionEnd() {
        return this.getInputOrTextarea().selectionEnd
    }
    set selectionEnd(e) {
        this.getInputOrTextarea().selectionEnd = e
    }
    get selectionStart() {
        return this.getInputOrTextarea().selectionStart
    }
    set selectionStart(e) {
        this.getInputOrTextarea().selectionStart = e
    }
    get valueAsNumber() {
        const e = this.getInput();
        return e ? e.valueAsNumber : NaN
    }
    set valueAsNumber(e) {
        const t = this.getInput();
        t && (t.valueAsNumber = e, this.value = t.value)
    }
    get valueAsDate() {
        const e = this.getInput();
        return e ? e.valueAsDate : null
    }
    set valueAsDate(e) {
        const t = this.getInput();
        t && (t.valueAsDate = e, this.value = t.value)
    }
    get hasError() {
        return this.error || this.nativeError
    }
    select() {
        this.getInputOrTextarea().select()
    }
    setRangeText(...e) {
        this.getInputOrTextarea().setRangeText(...e), this.value = this.getInputOrTextarea().value
    }
    setSelectionRange(e, t, i) {
        this.getInputOrTextarea().setSelectionRange(e, t, i)
    }
    stepDown(e) {
        const t = this.getInput();
        t && (t.stepDown(e), this.value = t.value)
    }
    stepUp(e) {
        const t = this.getInput();
        t && (t.stepUp(e), this.value = t.value)
    }
    reset() {
        this.dirty = !1, this.value = this.getAttribute("value") ?? "", this.nativeError = !1, this.nativeErrorText = ""
    }
    attributeChangedCallback(e, t, i) {
        "value" === e && this.dirty || super.attributeChangedCallback(e, t, i)
    }
    render() {
        const e = {
            disabled: this.disabled,
            error: !this.disabled && this.hasError,
            textarea: "textarea" === this.type,
            "no-spinner": this.noSpinner
        };
        return o `
      <span class="text-field ${h(e)}">
        ${this.renderField()}
      </span>
    `
    }
    updated(e) {
        const t = this.getInputOrTextarea().value;
        this.value !== t && (this.value = t)
    }
    renderField() {
        return Q `<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${"textarea"===this.type}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
    </${this.fieldTag}>`
    }
    renderLeadingIcon() {
        return o `
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `
    }
    renderTrailingIcon() {
        return o `
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `
    }
    renderInputOrTextarea() {
        const e = {
                direction: this.textDirection
            },
            t = this.ariaLabel || this.label || c,
            i = this.autocomplete,
            r = (this.maxLength ?? -1) > -1,
            s = (this.minLength ?? -1) > -1;
        if ("textarea" === this.type) return o `
        <textarea
          class="input"
          style=${Fe(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${i||c}
          ?disabled=${this.disabled}
          maxlength=${r?this.maxLength:c}
          minlength=${s?this.minLength:c}
          placeholder=${this.placeholder||c}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${Ue(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
        const a = this.renderPrefix(),
            n = this.renderSuffix(),
            l = this.inputMode;
        return o `
      <div class="input-wrapper">
        ${a}
        <input
          class="input"
          style=${Fe(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${i||c}
          ?disabled=${this.disabled}
          inputmode=${l||c}
          max=${this.max||c}
          maxlength=${r?this.maxLength:c}
          min=${this.min||c}
          minlength=${s?this.minLength:c}
          pattern=${this.pattern||c}
          placeholder=${this.placeholder||c}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||c}
          type=${this.type}
          .value=${Ue(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${n}
      </div>
    `
    }
    renderPrefix() {
        return this.renderAffix(this.prefixText, !1)
    }
    renderSuffix() {
        return this.renderAffix(this.suffixText, !0)
    }
    renderAffix(e, t) {
        if (!e) return c;
        return o `<span class="${h({suffix:t,prefix:!t})}">${e}</span>`
    }
    getErrorText() {
        return this.error ? this.errorText : this.nativeErrorText
    }
    handleFocusChange() {
        this.focused = this.inputOrTextarea?.matches(":focus") ?? !1
    }
    handleInput(e) {
        this.dirty = !0, this.value = e.target.value
    }
    redispatchEvent(e) {
        y(this, e)
    }
    getInputOrTextarea() {
        return this.inputOrTextarea || (this.connectedCallback(), this.scheduleUpdate()), this.isUpdatePending && this.scheduleUpdate(), this.inputOrTextarea
    }
    getInput() {
        return "textarea" === this.type ? null : this.getInputOrTextarea()
    }
    handleIconChange() {
        this.hasLeadingIcon = this.leadingIcons.length > 0, this.hasTrailingIcon = this.trailingIcons.length > 0
    } [ce]() {
        return this.value
    }
    formResetCallback() {
        this.reset()
    }
    formStateRestoreCallback(e) {
        this.value = e
    }
    focus() {
        this.getInputOrTextarea().focus()
    } [oe]() {
        return new je((() => ({
            state: this,
            renderedControl: this.inputOrTextarea
        })))
    } [se]() {
        return this.inputOrTextarea
    } [Ne](e) {
        e?.preventDefault();
        const t = this.getErrorText();
        this.nativeError = !!e, this.nativeErrorText = this.validationMessage, t === this.getErrorText() && this.field?.reannounceError()
    }
}
l(Xe), Xe.shadowRootOptions = {
    ...r.shadowRootOptions,
    delegatesFocus: !0
}, t([a({
    type: Boolean,
    reflect: !0
})], Xe.prototype, "error", void 0), t([a({
    attribute: "error-text"
})], Xe.prototype, "errorText", void 0), t([a()], Xe.prototype, "label", void 0), t([a({
    type: Boolean,
    reflect: !0
})], Xe.prototype, "required", void 0), t([a()], Xe.prototype, "value", void 0), t([a({
    attribute: "prefix-text"
})], Xe.prototype, "prefixText", void 0), t([a({
    attribute: "suffix-text"
})], Xe.prototype, "suffixText", void 0), t([a({
    type: Boolean,
    attribute: "has-leading-icon"
})], Xe.prototype, "hasLeadingIcon", void 0), t([a({
    type: Boolean,
    attribute: "has-trailing-icon"
})], Xe.prototype, "hasTrailingIcon", void 0), t([a({
    attribute: "supporting-text"
})], Xe.prototype, "supportingText", void 0), t([a({
    attribute: "text-direction"
})], Xe.prototype, "textDirection", void 0), t([a({
    type: Number
})], Xe.prototype, "rows", void 0), t([a({
    type: Number
})], Xe.prototype, "cols", void 0), t([a({
    reflect: !0
})], Xe.prototype, "inputMode", void 0), t([a()], Xe.prototype, "max", void 0), t([a({
    type: Number
})], Xe.prototype, "maxLength", void 0), t([a()], Xe.prototype, "min", void 0), t([a({
    type: Number
})], Xe.prototype, "minLength", void 0), t([a({
    type: Boolean,
    attribute: "no-spinner"
})], Xe.prototype, "noSpinner", void 0), t([a()], Xe.prototype, "pattern", void 0), t([a({
    reflect: !0,
    converter: Me
})], Xe.prototype, "placeholder", void 0), t([a({
    type: Boolean,
    reflect: !0
})], Xe.prototype, "readOnly", void 0), t([a({
    type: Boolean,
    reflect: !0
})], Xe.prototype, "multiple", void 0), t([a()], Xe.prototype, "step", void 0), t([a({
    reflect: !0
})], Xe.prototype, "type", void 0), t([a({
    reflect: !0
})], Xe.prototype, "autocomplete", void 0), t([m()], Xe.prototype, "dirty", void 0), t([m()], Xe.prototype, "focused", void 0), t([m()], Xe.prototype, "nativeError", void 0), t([m()], Xe.prototype, "nativeErrorText", void 0), t([d(".input")], Xe.prototype, "inputOrTextarea", void 0), t([d(".field")], Xe.prototype, "field", void 0), t([i({
    slot: "leading-icon"
})], Xe.prototype, "leadingIcons", void 0), t([i({
    slot: "trailing-icon"
})], Xe.prototype, "trailingIcons", void 0);
class Je extends Xe {
    constructor() {
        super(...arguments), this.fieldTag = X `md-filled-field`
    }
}
const Qe = s `:host{display:inline-flex;outline:none;resize:both;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}.icon{color:currentColor;display:flex;fill:currentColor}.icon ::slotted(*){display:flex}[hasstart] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[hasend] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;
class et extends Je {
    constructor() {
        super(...arguments), this.fieldTag = X `md-filled-field`
    }
}
et.styles = [Qe, Ie], customElements.define("ew-filled-text-field", et);
class tt extends r {
    connectedCallback() {
        super.connectedCallback(), this.setAttribute("aria-hidden", "true")
    }
    render() {
        return o `<span class="shadow"></span>`
    }
}
const it = s `:host{display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;
let rt = class extends tt {};
rt.styles = [it], rt = t([n("md-elevation")], rt);
const ot = function (e, t) {
        return new CustomEvent("close-menu", {
            bubbles: !0,
            composed: !0,
            detail: {
                initiator: e,
                reason: t,
                itemPath: [e]
            }
        })
    },
    st = {
        SPACE: "Space",
        ENTER: "Enter"
    },
    at = "click-selection",
    nt = "keydown",
    lt = {
        ESCAPE: "Escape",
        SPACE: st.SPACE,
        ENTER: st.ENTER
    };

function dt(e) {
    return Object.values(lt).some((t => t === e))
}

function ct(e, t) {
    const i = new Event("md-contains", {
        bubbles: !0,
        composed: !0
    });
    let r = [];
    const o = e => {
        r = e.composedPath()
    };
    t.addEventListener("md-contains", o), e.dispatchEvent(i), t.removeEventListener("md-contains", o);
    return r.length > 0
}
const ht = "none",
    pt = "list-root",
    ft = "first-item",
    ut = "last-item",
    mt = "end-start",
    vt = "start-start";
class gt {
    constructor(e, t) {
        this.host = e, this.getProperties = t, this.surfaceStylesInternal = {
            display: "none"
        }, this.lastValues = {
            isOpen: !1
        }, this.host.addController(this)
    }
    get surfaceStyles() {
        return this.surfaceStylesInternal
    }
    async position() {
        const {
            surfaceEl: e,
            anchorEl: t,
            anchorCorner: i,
            surfaceCorner: r,
            positioning: o,
            xOffset: s,
            yOffset: a,
            repositionStrategy: n
        } = this.getProperties(), l = i.toLowerCase().trim(), d = r.toLowerCase().trim();
        if (!e || !t) return;
        const c = window.innerWidth,
            h = window.innerHeight,
            p = document.createElement("div");
        p.style.opacity = "0", p.style.position = "fixed", p.style.display = "block", p.style.inset = "0", document.body.appendChild(p);
        const f = p.getBoundingClientRect();
        p.remove();
        const u = window.innerHeight - f.bottom,
            m = window.innerWidth - f.right;
        this.surfaceStylesInternal = {
            display: "block",
            opacity: "0"
        }, this.host.requestUpdate(), await this.host.updateComplete, e.popover && e.isConnected && e.showPopover();
        const v = e.getSurfacePositionClientRect ? e.getSurfacePositionClientRect() : e.getBoundingClientRect(),
            g = t.getSurfacePositionClientRect ? t.getSurfacePositionClientRect() : t.getBoundingClientRect(),
            [y, b] = d.split("-"),
            [_, x] = l.split("-"),
            w = "ltr" === getComputedStyle(e).direction;
        let {
            blockInset: E,
            blockOutOfBoundsCorrection: k,
            surfaceBlockProperty: A
        } = this.calculateBlock({
            surfaceRect: v,
            anchorRect: g,
            anchorBlock: _,
            surfaceBlock: y,
            yOffset: a,
            positioning: o,
            windowInnerHeight: h,
            blockScrollbarHeight: u
        });
        if (k) {
            const e = "start" === y ? "end" : "start",
                t = "start" === _ ? "end" : "start",
                i = this.calculateBlock({
                    surfaceRect: v,
                    anchorRect: g,
                    anchorBlock: t,
                    surfaceBlock: e,
                    yOffset: a,
                    positioning: o,
                    windowInnerHeight: h,
                    blockScrollbarHeight: u
                });
            k > i.blockOutOfBoundsCorrection && (E = i.blockInset, k = i.blockOutOfBoundsCorrection, A = i.surfaceBlockProperty)
        }
        let {
            inlineInset: S,
            inlineOutOfBoundsCorrection: R,
            surfaceInlineProperty: T
        } = this.calculateInline({
            surfaceRect: v,
            anchorRect: g,
            anchorInline: x,
            surfaceInline: b,
            xOffset: s,
            positioning: o,
            isLTR: w,
            windowInnerWidth: c,
            inlineScrollbarWidth: m
        });
        if (R) {
            const e = "start" === b ? "end" : "start",
                t = "start" === x ? "end" : "start",
                i = this.calculateInline({
                    surfaceRect: v,
                    anchorRect: g,
                    anchorInline: t,
                    surfaceInline: e,
                    xOffset: s,
                    positioning: o,
                    isLTR: w,
                    windowInnerWidth: c,
                    inlineScrollbarWidth: m
                });
            Math.abs(R) > Math.abs(i.inlineOutOfBoundsCorrection) && (S = i.inlineInset, R = i.inlineOutOfBoundsCorrection, T = i.surfaceInlineProperty)
        }
        "move" === n && (E -= k, S -= R), this.surfaceStylesInternal = {
            display: "block",
            opacity: "1",
            [A]: `${E}px`,
            [T]: `${S}px`
        }, "resize" === n && (k && (this.surfaceStylesInternal.height = v.height - k + "px"), R && (this.surfaceStylesInternal.width = v.width - R + "px")), this.host.requestUpdate()
    }
    calculateBlock(e) {
        const {
            surfaceRect: t,
            anchorRect: i,
            anchorBlock: r,
            surfaceBlock: o,
            yOffset: s,
            positioning: a,
            windowInnerHeight: n,
            blockScrollbarHeight: l
        } = e, d = "fixed" === a || "document" === a ? 1 : 0, c = "document" === a ? 1 : 0, h = "start" === o ? 1 : 0, p = "end" === o ? 1 : 0, f = (r !== o ? 1 : 0) * i.height + s, u = h * i.top + p * (n - i.bottom - l);
        return {
            blockInset: d * u + c * (h * window.scrollY - p * window.scrollY) + f,
            blockOutOfBoundsCorrection: Math.abs(Math.min(0, n - u - f - t.height)),
            surfaceBlockProperty: "start" === o ? "inset-block-start" : "inset-block-end"
        }
    }
    calculateInline(e) {
        const {
            isLTR: t,
            surfaceInline: i,
            anchorInline: r,
            anchorRect: o,
            surfaceRect: s,
            xOffset: a,
            positioning: n,
            windowInnerWidth: l,
            inlineScrollbarWidth: d
        } = e, c = "fixed" === n || "document" === n ? 1 : 0, h = "document" === n ? 1 : 0, p = t ? 1 : 0, f = t ? 0 : 1, u = "start" === i ? 1 : 0, m = "end" === i ? 1 : 0, v = (r !== i ? 1 : 0) * o.width + a, g = p * (u * o.left + m * (l - o.right - d)) + f * (u * (l - o.right - d) + m * o.left);
        let y = "start" === i ? "inset-inline-start" : "inset-inline-end";
        return "document" !== n && "fixed" !== n || (y = "start" === i && t || "end" === i && !t ? "left" : "right"), {
            inlineInset: c * g + v + h * (p * (u * window.scrollX - m * window.scrollX) + f * (m * window.scrollX - u * window.scrollX)),
            inlineOutOfBoundsCorrection: Math.abs(Math.min(0, l - g - v - s.width)),
            surfaceInlineProperty: y
        }
    }
    hostUpdate() {
        this.onUpdate()
    }
    hostUpdated() {
        this.onUpdate()
    }
    async onUpdate() {
        const e = this.getProperties();
        let t = !1;
        for (const [i, r] of Object.entries(e))
            if (t = t || r !== this.lastValues[i], t) break;
        const i = this.lastValues.isOpen !== e.isOpen,
            r = !!e.anchorEl,
            o = !!e.surfaceEl;
        t && r && o && (this.lastValues.isOpen = e.isOpen, e.isOpen ? (this.lastValues = e, await this.position(), e.onOpen()) : i && (await e.beforeClose(), this.close(), e.onClose()))
    }
    close() {
        this.surfaceStylesInternal = {
            display: "none"
        }, this.host.requestUpdate();
        const e = this.getProperties().surfaceEl;
        e?.popover && e?.isConnected && e.hidePopover()
    }
}
const yt = 0,
    bt = 1,
    _t = 2;
class xt {
    constructor(e) {
        this.getProperties = e, this.typeaheadRecords = [], this.typaheadBuffer = "", this.cancelTypeaheadTimeout = 0, this.isTypingAhead = !1, this.lastActiveRecord = null, this.onKeydown = e => {
            this.isTypingAhead ? this.typeahead(e) : this.beginTypeahead(e)
        }, this.endTypeahead = () => {
            this.isTypingAhead = !1, this.typaheadBuffer = "", this.typeaheadRecords = []
        }
    }
    get items() {
        return this.getProperties().getItems()
    }
    get active() {
        return this.getProperties().active
    }
    beginTypeahead(e) {
        this.active && ("Space" === e.code || "Enter" === e.code || e.code.startsWith("Arrow") || "Escape" === e.code || (this.isTypingAhead = !0, this.typeaheadRecords = this.items.map(((e, t) => [t, e, e.typeaheadText.trim().toLowerCase()])), this.lastActiveRecord = this.typeaheadRecords.find((e => 0 === e[bt].tabIndex)) ?? null, this.lastActiveRecord && (this.lastActiveRecord[bt].tabIndex = -1), this.typeahead(e)))
    }
    typeahead(e) {
        if (e.defaultPrevented) return;
        if (clearTimeout(this.cancelTypeaheadTimeout), "Enter" === e.code || e.code.startsWith("Arrow") || "Escape" === e.code) return this.endTypeahead(), void(this.lastActiveRecord && (this.lastActiveRecord[bt].tabIndex = -1));
        "Space" === e.code && e.preventDefault(), this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime), this.typaheadBuffer += e.key.toLowerCase();
        const t = this.lastActiveRecord ? this.lastActiveRecord[yt] : -1,
            i = this.typeaheadRecords.length,
            r = e => (e[yt] + i - t) % i,
            o = this.typeaheadRecords.filter((e => !e[bt].disabled && e[_t].startsWith(this.typaheadBuffer))).sort(((e, t) => r(e) - r(t)));
        if (0 === o.length) return clearTimeout(this.cancelTypeaheadTimeout), this.lastActiveRecord && (this.lastActiveRecord[bt].tabIndex = -1), void this.endTypeahead();
        const s = 1 === this.typaheadBuffer.length;
        let a;
        a = this.lastActiveRecord === o[0] && s ? o[1] ?? o[0] : o[0], this.lastActiveRecord && (this.lastActiveRecord[bt].tabIndex = -1), this.lastActiveRecord = a, a[bt].tabIndex = 0, a[bt].focus()
    }
}
const wt = new Set([F.ArrowDown, F.ArrowUp, F.Home, F.End]),
    Et = new Set([F.ArrowLeft, F.ArrowRight, ...wt]);
class kt extends r {
    get openDirection() {
        return "start" === this.menuCorner.split("-")[0] ? "DOWN" : "UP"
    }
    get anchorElement() {
        return this.anchor ? this.getRootNode().querySelector(`#${this.anchor}`) : this.currentAnchorElement
    }
    set anchorElement(e) {
        this.currentAnchorElement = e, this.requestUpdate("anchorElement")
    }
    constructor() {
        super(), this.anchor = "", this.positioning = "absolute", this.quick = !1, this.hasOverflow = !1, this.open = !1, this.xOffset = 0, this.yOffset = 0, this.typeaheadDelay = 200, this.anchorCorner = mt, this.menuCorner = vt, this.stayOpenOnOutsideClick = !1, this.stayOpenOnFocusout = !1, this.skipRestoreFocus = !1, this.defaultFocus = ft, this.typeaheadActive = !0, this.isSubmenu = !1, this.pointerPath = [], this.isRepositioning = !1, this.openCloseAnimationSignal = R(), this.listController = new M({
            isItem: e => e.hasAttribute("md-menu-item"),
            getPossibleItems: () => this.slotItems,
            isRtl: () => "rtl" === getComputedStyle(this).direction,
            deactivateItem: e => {
                e.selected = !1, e.tabIndex = -1
            },
            activateItem: e => {
                e.selected = !0, e.tabIndex = 0
            },
            isNavigableKey: e => {
                if (!this.isSubmenu) return Et.has(e);
                return e === ("rtl" === getComputedStyle(this).direction ? F.ArrowLeft : F.ArrowRight) || wt.has(e)
            }
        }), this.lastFocusedElement = null, this.typeaheadController = new xt((() => ({
            getItems: () => this.items,
            typeaheadBufferTime: this.typeaheadDelay,
            active: this.typeaheadActive
        }))), this.currentAnchorElement = null, this.internals = this.attachInternals(), this.menuPositionController = new gt(this, (() => ({
            anchorCorner: this.anchorCorner,
            surfaceCorner: this.menuCorner,
            surfaceEl: this.surfaceEl,
            anchorEl: this.anchorElement,
            positioning: "popover" === this.positioning ? "document" : this.positioning,
            isOpen: this.open,
            xOffset: this.xOffset,
            yOffset: this.yOffset,
            onOpen: this.onOpened,
            beforeClose: this.beforeClose,
            onClose: this.onClosed,
            repositionStrategy: this.hasOverflow && "popover" !== this.positioning ? "move" : "resize"
        }))), this.onWindowResize = () => {
            this.isRepositioning || "document" !== this.positioning && "fixed" !== this.positioning && "popover" !== this.positioning || (this.isRepositioning = !0, this.reposition(), this.isRepositioning = !1)
        }, this.handleFocusout = async e => {
            const t = this.anchorElement;
            if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(t)) return;
            if (e.relatedTarget) {
                if (ct(e.relatedTarget, this) || 0 !== this.pointerPath.length && ct(e.relatedTarget, t)) return
            } else if (this.pointerPath.includes(this)) return;
            const i = this.skipRestoreFocus;
            this.skipRestoreFocus = !0, this.close(), await this.updateComplete, this.skipRestoreFocus = i
        }, this.onOpened = async () => {
            this.lastFocusedElement = function (e = document) {
                let t = e.activeElement;
                for (; t && t?.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
                return t
            }();
            const e = this.items,
                t = L(e);
            t && this.defaultFocus !== ht && (t.item.tabIndex = -1);
            let i = !this.quick;
            switch (this.quick ? this.dispatchEvent(new Event("opening")) : i = !!await this.animateOpen(), this.defaultFocus) {
            case ft:
                const t = O(e);
                t && (t.tabIndex = 0, t.focus(), await t.updateComplete);
                break;
            case ut:
                const i = z(e);
                i && (i.tabIndex = 0, i.focus(), await i.updateComplete);
                break;
            case pt:
                this.focus()
            }
            i || this.dispatchEvent(new Event("opened"))
        }, this.beforeClose = async () => {
            this.open = !1, this.skipRestoreFocus || this.lastFocusedElement?.focus?.(), this.quick || await this.animateClose()
        }, this.onClosed = () => {
            this.quick && (this.dispatchEvent(new Event("closing")), this.dispatchEvent(new Event("closed")))
        }, this.onWindowPointerdown = e => {
            this.pointerPath = e.composedPath()
        }, this.onDocumentClick = e => {
            if (!this.open) return;
            const t = e.composedPath();
            this.stayOpenOnOutsideClick || t.includes(this) || t.includes(this.anchorElement) || (this.open = !1)
        }, this.internals.role = "menu", this.addEventListener("keydown", this.handleKeydown), this.addEventListener("keydown", this.captureKeydown, {
            capture: !0
        }), this.addEventListener("focusout", this.handleFocusout)
    }
    get items() {
        return this.listController.items
    }
    willUpdate(e) {
        e.has("open") && (this.open ? this.removeAttribute("aria-hidden") : this.setAttribute("aria-hidden", "true"))
    }
    update(e) {
        e.has("open") && (this.open ? this.setUpGlobalEventListeners() : this.cleanUpGlobalEventListeners()), e.has("positioning") && "popover" === this.positioning && !this.showPopover && (this.positioning = "fixed"), super.update(e)
    }
    connectedCallback() {
        super.connectedCallback(), this.open && this.setUpGlobalEventListeners()
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.cleanUpGlobalEventListeners()
    }
    render() {
        return this.renderSurface()
    }
    renderSurface() {
        return o `
      <div
        class="menu ${h(this.getSurfaceClasses())}"
        style=${Fe(this.menuPositionController.surfaceStyles)}
        popover=${"popover"===this.positioning?"manual":c}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `
    }
    renderMenuItems() {
        return o `<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`
    }
    renderElevation() {
        return o `<md-elevation part="elevation"></md-elevation>`
    }
    getSurfaceClasses() {
        return {
            open: this.open,
            fixed: "fixed" === this.positioning,
            "has-overflow": this.hasOverflow
        }
    }
    captureKeydown(e) {
        e.target === this && !e.defaultPrevented && dt(e.code) && (e.preventDefault(), this.close()), this.typeaheadController.onKeydown(e)
    }
    async animateOpen() {
        const e = this.surfaceEl,
            t = this.slotEl;
        if (!e || !t) return !0;
        const i = this.openDirection;
        this.dispatchEvent(new Event("opening")), e.classList.toggle("animating", !0);
        const r = this.openCloseAnimationSignal.start(),
            o = e.offsetHeight,
            s = "UP" === i,
            a = this.items,
            n = 250 / a.length,
            l = e.animate([{
                height: "0px"
            }, {
                height: `${o}px`
            }], {
                duration: 500,
                easing: w.EMPHASIZED
            }),
            d = t.animate([{
                transform: s ? `translateY(-${o}px)` : ""
            }, {
                transform: ""
            }], {
                duration: 500,
                easing: w.EMPHASIZED
            }),
            c = e.animate([{
                opacity: 0
            }, {
                opacity: 1
            }], 50),
            h = [];
        for (let e = 0; e < a.length; e++) {
            const t = a[s ? a.length - 1 - e : e],
                i = t.animate([{
                    opacity: 0
                }, {
                    opacity: 1
                }], {
                    duration: 250,
                    delay: n * e
                });
            t.classList.toggle("md-menu-hidden", !0), i.addEventListener("finish", (() => {
                t.classList.toggle("md-menu-hidden", !1)
            })), h.push([t, i])
        }
        let p = e => {};
        const f = new Promise((e => {
            p = e
        }));
        return r.addEventListener("abort", (() => {
            l.cancel(), d.cancel(), c.cancel(), h.forEach((([e, t]) => {
                e.classList.toggle("md-menu-hidden", !1), t.cancel()
            })), p(!0)
        })), l.addEventListener("finish", (() => {
            e.classList.toggle("animating", !1), this.openCloseAnimationSignal.finish(), p(!1)
        })), await f
    }
    animateClose() {
        let e, t;
        const i = new Promise(((i, r) => {
                e = i, t = r
            })),
            r = this.surfaceEl,
            o = this.slotEl;
        if (!r || !o) return t(), i;
        const s = "UP" === this.openDirection;
        this.dispatchEvent(new Event("closing")), r.classList.toggle("animating", !0);
        const a = this.openCloseAnimationSignal.start(),
            n = r.offsetHeight,
            l = this.items,
            d = 150,
            c = 50 / l.length,
            h = r.animate([{
                height: `${n}px`
            }, {
                height: .35 * n + "px"
            }], {
                duration: d,
                easing: w.EMPHASIZED_ACCELERATE
            }),
            p = o.animate([{
                transform: ""
            }, {
                transform: s ? `translateY(-${.65*n}px)` : ""
            }], {
                duration: d,
                easing: w.EMPHASIZED_ACCELERATE
            }),
            f = r.animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: 50,
                delay: 100
            }),
            u = [];
        for (let e = 0; e < l.length; e++) {
            const t = l[s ? e : l.length - 1 - e],
                i = t.animate([{
                    opacity: 1
                }, {
                    opacity: 0
                }], {
                    duration: 50,
                    delay: 50 + c * e
                });
            i.addEventListener("finish", (() => {
                t.classList.toggle("md-menu-hidden", !0)
            })), u.push([t, i])
        }
        return a.addEventListener("abort", (() => {
            h.cancel(), p.cancel(), f.cancel(), u.forEach((([e, t]) => {
                t.cancel(), e.classList.toggle("md-menu-hidden", !1)
            })), t()
        })), h.addEventListener("finish", (() => {
            r.classList.toggle("animating", !1), u.forEach((([e]) => {
                e.classList.toggle("md-menu-hidden", !1)
            })), this.openCloseAnimationSignal.finish(), this.dispatchEvent(new Event("closed")), e(!0)
        })), i
    }
    handleKeydown(e) {
        this.pointerPath = [], this.listController.handleKeydown(e)
    }
    setUpGlobalEventListeners() {
        document.addEventListener("click", this.onDocumentClick, {
            capture: !0
        }), window.addEventListener("pointerdown", this.onWindowPointerdown), document.addEventListener("resize", this.onWindowResize, {
            passive: !0
        }), window.addEventListener("resize", this.onWindowResize, {
            passive: !0
        })
    }
    cleanUpGlobalEventListeners() {
        document.removeEventListener("click", this.onDocumentClick, {
            capture: !0
        }), window.removeEventListener("pointerdown", this.onWindowPointerdown), document.removeEventListener("resize", this.onWindowResize), window.removeEventListener("resize", this.onWindowResize)
    }
    onCloseMenu() {
        this.close()
    }
    onDeactivateItems(e) {
        e.stopPropagation(), this.listController.onDeactivateItems()
    }
    onRequestActivation(e) {
        e.stopPropagation(), this.listController.onRequestActivation(e)
    }
    handleDeactivateTypeahead(e) {
        e.stopPropagation(), this.typeaheadActive = !1
    }
    handleActivateTypeahead(e) {
        e.stopPropagation(), this.typeaheadActive = !0
    }
    handleStayOpenOnFocusout(e) {
        e.stopPropagation(), this.stayOpenOnFocusout = !0
    }
    handleCloseOnFocusout(e) {
        e.stopPropagation(), this.stayOpenOnFocusout = !1
    }
    close() {
        this.open = !1;
        this.slotItems.forEach((e => {
            e.close?.()
        }))
    }
    show() {
        this.open = !0
    }
    activateNextItem() {
        return this.listController.activateNextItem() ?? null
    }
    activatePreviousItem() {
        return this.listController.activatePreviousItem() ?? null
    }
    reposition() {
        this.open && this.menuPositionController.position()
    }
}
t([d(".menu")], kt.prototype, "surfaceEl", void 0), t([d("slot")], kt.prototype, "slotEl", void 0), t([a()], kt.prototype, "anchor", void 0), t([a()], kt.prototype, "positioning", void 0), t([a({
    type: Boolean
})], kt.prototype, "quick", void 0), t([a({
    type: Boolean,
    attribute: "has-overflow"
})], kt.prototype, "hasOverflow", void 0), t([a({
    type: Boolean,
    reflect: !0
})], kt.prototype, "open", void 0), t([a({
    type: Number,
    attribute: "x-offset"
})], kt.prototype, "xOffset", void 0), t([a({
    type: Number,
    attribute: "y-offset"
})], kt.prototype, "yOffset", void 0), t([a({
    type: Number,
    attribute: "typeahead-delay"
})], kt.prototype, "typeaheadDelay", void 0), t([a({
    attribute: "anchor-corner"
})], kt.prototype, "anchorCorner", void 0), t([a({
    attribute: "menu-corner"
})], kt.prototype, "menuCorner", void 0), t([a({
    type: Boolean,
    attribute: "stay-open-on-outside-click"
})], kt.prototype, "stayOpenOnOutsideClick", void 0), t([a({
    type: Boolean,
    attribute: "stay-open-on-focusout"
})], kt.prototype, "stayOpenOnFocusout", void 0), t([a({
    type: Boolean,
    attribute: "skip-restore-focus"
})], kt.prototype, "skipRestoreFocus", void 0), t([a({
    attribute: "default-focus"
})], kt.prototype, "defaultFocus", void 0), t([i({
    flatten: !0
})], kt.prototype, "slotItems", void 0), t([m()], kt.prototype, "typeaheadActive", void 0);
const At = s `:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, 4px)}.menu{border-radius:var(--md-menu-container-shape, 4px);display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit}.item-padding{padding-block:8px}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;
let St = class extends kt {};
St.styles = [At], St = t([n("md-menu")], St);
class Rt extends fe {
    computeValidity(e) {
        return this.selectControl || (this.selectControl = document.createElement("select")), x(o `<option value=${e.value}></option>`, this.selectControl), this.selectControl.value = e.value, this.selectControl.required = e.required, {
            validity: this.selectControl.validity,
            validationMessage: this.selectControl.validationMessage
        }
    }
    equals(e, t) {
        return e.value === t.value && e.required === t.required
    }
    copy({
        value: e,
        required: t
    }) {
        return {
            value: e,
            required: t
        }
    }
}
var Tt;
const It = Symbol("value"),
    Ct = Ve(de(pe(b(r))));
class Bt extends Ct {
    get value() {
        return this[It]
    }
    set value(e) {
        this.lastUserSetValue = e, this.select(e)
    }
    get options() {
        return this.menu?.items ?? []
    }
    get selectedIndex() {
        const [e, t] = (this.getSelectedOptions() ?? [])[0] ?? [];
        return t ?? -1
    }
    set selectedIndex(e) {
        this.lastUserSetSelectedIndex = e, this.selectIndex(e)
    }
    get selectedOptions() {
        return (this.getSelectedOptions() ?? []).map((([e]) => e))
    }
    get hasError() {
        return this.error || this.nativeError
    }
    constructor() {
        super(), this.quick = !1, this.required = !1, this.errorText = "", this.label = "", this.supportingText = "", this.error = !1, this.menuPositioning = "popover", this.clampMenuWidth = !1, this.typeaheadDelay = 200, this.hasLeadingIcon = !1, this.displayText = "", this.menuAlign = "start", this[Tt] = "", this.lastUserSetValue = null, this.lastUserSetSelectedIndex = null, this.lastSelectedOption = null, this.lastSelectedOptionRecords = [], this.nativeError = !1, this.nativeErrorText = "", this.focused = !1, this.open = !1, this.defaultFocus = ht, this.prevOpen = this.open, this.selectWidth = 0, this.addEventListener("focus", this.handleFocus.bind(this)), this.addEventListener("blur", this.handleBlur.bind(this))
    }
    select(e) {
        const t = this.options.find((t => t.value === e));
        t && this.selectItem(t)
    }
    selectIndex(e) {
        const t = this.options[e];
        t && this.selectItem(t)
    }
    reset() {
        for (const e of this.options) e.selected = e.hasAttribute("selected");
        this.updateValueAndDisplayText(), this.nativeError = !1, this.nativeErrorText = ""
    } [(Tt = It, Ne)](e) {
        e?.preventDefault();
        const t = this.getErrorText();
        this.nativeError = !!e, this.nativeErrorText = this.validationMessage, t === this.getErrorText() && this.field?.reannounceError()
    }
    update(e) {
        if (this.hasUpdated || this.initUserSelection(), this.prevOpen !== this.open && this.open) {
            const e = this.getBoundingClientRect();
            this.selectWidth = e.width
        }
        this.prevOpen = this.open, super.update(e)
    }
    render() {
        return o `
      <span
        class="select ${h(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `
    }
    async firstUpdated(e) {
        await (this.menu?.updateComplete), this.lastSelectedOptionRecords.length || this.initUserSelection(), this.lastSelectedOptionRecords.length || this.options.length || setTimeout((() => {
            this.updateValueAndDisplayText()
        })), super.firstUpdated(e)
    }
    getRenderClasses() {
        return {
            disabled: this.disabled,
            error: this.error,
            open: this.open
        }
    }
    renderField() {
        return Q `
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled?"-1":"0"}
          aria-label=${this.ariaLabel||c}
          aria-describedby="description"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          .focused=${this.focused||this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`
    }
    renderFieldContent() {
        return [this.renderLeadingIcon(), this.renderLabel(), this.renderTrailingIcon()]
    }
    renderLeadingIcon() {
        return o `
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `
    }
    renderTrailingIcon() {
        return o `
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `
    }
    renderLabel() {
        return o `<div id="label">${this.displayText||o`&nbsp;`}</div>`
    }
    renderMenu() {
        const e = this.label || this.ariaLabel;
        return o `<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${e||c}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${Fe({"--__menu-min-width":`${this.selectWidth}px`,"--__menu-max-width":this.clampMenuWidth?`${this.selectWidth}px`:void 0})}
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${"start"===this.menuAlign?"end-start":"end-end"}
        .menuCorner=${"start"===this.menuAlign?"start-start":"start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`
    }
    renderMenuContent() {
        return o `<slot></slot>`
    }
    handleKeydown(e) {
        if (this.open || this.disabled || !this.menu) return;
        const t = this.menu.typeaheadController,
            i = "Space" === e.code || "ArrowDown" === e.code || "ArrowUp" === e.code || "End" === e.code || "Home" === e.code || "Enter" === e.code;
        if (!t.isTypingAhead && i) {
            switch (e.preventDefault(), this.open = !0, e.code) {
            case "Space":
            case "ArrowDown":
            case "Enter":
                this.defaultFocus = ht;
                break;
            case "End":
                this.defaultFocus = ut;
                break;
            case "ArrowUp":
            case "Home":
                this.defaultFocus = ft
            }
            return
        }
        if (1 === e.key.length) {
            t.onKeydown(e), e.preventDefault();
            const {
                lastActiveRecord: i
            } = t;
            if (!i) return;
            this.labelEl?.setAttribute?.("aria-live", "polite");
            this.selectItem(i[bt]) && this.dispatchInteractionEvents()
        }
    }
    handleClick() {
        this.open = !this.open
    }
    handleFocus() {
        this.focused = !0
    }
    handleBlur() {
        this.focused = !1
    }
    handleFocusout(e) {
        e.relatedTarget && ct(e.relatedTarget, this) || (this.open = !1)
    }
    getSelectedOptions() {
        if (!this.menu) return this.lastSelectedOptionRecords = [], null;
        const e = this.menu.items;
        return this.lastSelectedOptionRecords = function (e) {
            const t = [];
            for (let i = 0; i < e.length; i++) {
                const r = e[i];
                r.selected && t.push([r, i])
            }
            return t
        }(e), this.lastSelectedOptionRecords
    }
    async getUpdateComplete() {
        return await (this.menu?.updateComplete), super.getUpdateComplete()
    }
    updateValueAndDisplayText() {
        const e = this.getSelectedOptions() ?? [];
        let t = !1;
        if (e.length) {
            const [i] = e[0];
            t = this.lastSelectedOption !== i, this.lastSelectedOption = i, this[It] = i.value, this.displayText = i.displayText
        } else t = null !== this.lastSelectedOption, this.lastSelectedOption = null, this[It] = "", this.displayText = "";
        return t
    }
    async handleOpening(e) {
        if (this.labelEl?.removeAttribute?.("aria-live"), this.redispatchEvent(e), this.defaultFocus !== ht) return;
        const t = this.menu.items,
            i = L(t)?.item;
        let [r] = this.lastSelectedOptionRecords[0] ?? [null];
        i && i !== r && (i.tabIndex = -1), r = r ?? t[0], r && (r.tabIndex = 0, r.focus())
    }
    redispatchEvent(e) {
        y(this, e)
    }
    handleClosed(e) {
        this.open = !1, this.redispatchEvent(e)
    }
    handleCloseMenu(e) {
        const t = e.detail.reason,
            i = e.detail.itemPath[0];
        this.open = !1;
        let r = !1;
        "click-selection" === t.kind || "keydown" === t.kind && function (e) {
            return Object.values(st).some((t => t === e))
        }(t.key) ? r = this.selectItem(i) : (i.tabIndex = -1, i.blur()), r && this.dispatchInteractionEvents()
    }
    selectItem(e) {
        return (this.getSelectedOptions() ?? []).forEach((([t]) => {
            e !== t && (t.selected = !1)
        })), e.selected = !0, this.updateValueAndDisplayText()
    }
    handleRequestSelection(e) {
        const t = e.target;
        this.lastSelectedOptionRecords.some((([e]) => e === t)) || this.selectItem(t)
    }
    handleRequestDeselection(e) {
        const t = e.target;
        this.lastSelectedOptionRecords.some((([e]) => e === t)) && this.updateValueAndDisplayText()
    }
    initUserSelection() {
        this.lastUserSetValue && !this.lastSelectedOptionRecords.length ? this.select(this.lastUserSetValue) : null === this.lastUserSetSelectedIndex || this.lastSelectedOptionRecords.length ? this.updateValueAndDisplayText() : this.selectIndex(this.lastUserSetSelectedIndex)
    }
    handleIconChange() {
        this.hasLeadingIcon = this.leadingIcons.length > 0
    }
    dispatchInteractionEvents() {
        this.dispatchEvent(new Event("input", {
            bubbles: !0,
            composed: !0
        })), this.dispatchEvent(new Event("change", {
            bubbles: !0
        }))
    }
    getErrorText() {
        return this.error ? this.errorText : this.nativeErrorText
    } [ce]() {
        return this.value
    }
    formResetCallback() {
        this.reset()
    }
    formStateRestoreCallback(e) {
        this.value = e
    } [oe]() {
        return new Rt((() => this))
    } [se]() {
        return this.field
    }
}
l(Bt), Bt.shadowRootOptions = {
    ...r.shadowRootOptions,
    delegatesFocus: !0
}, t([a({
    type: Boolean
})], Bt.prototype, "quick", void 0), t([a({
    type: Boolean
})], Bt.prototype, "required", void 0), t([a({
    type: String,
    attribute: "error-text"
})], Bt.prototype, "errorText", void 0), t([a()], Bt.prototype, "label", void 0), t([a({
    type: String,
    attribute: "supporting-text"
})], Bt.prototype, "supportingText", void 0), t([a({
    type: Boolean,
    reflect: !0
})], Bt.prototype, "error", void 0), t([a({
    attribute: "menu-positioning"
})], Bt.prototype, "menuPositioning", void 0), t([a({
    type: Boolean,
    attribute: "clamp-menu-width"
})], Bt.prototype, "clampMenuWidth", void 0), t([a({
    type: Number,
    attribute: "typeahead-delay"
})], Bt.prototype, "typeaheadDelay", void 0), t([a({
    type: Boolean,
    attribute: "has-leading-icon"
})], Bt.prototype, "hasLeadingIcon", void 0), t([a({
    attribute: "display-text"
})], Bt.prototype, "displayText", void 0), t([a({
    attribute: "menu-align"
})], Bt.prototype, "menuAlign", void 0), t([a()], Bt.prototype, "value", null), t([a({
    type: Number,
    attribute: "selected-index"
})], Bt.prototype, "selectedIndex", null), t([m()], Bt.prototype, "nativeError", void 0), t([m()], Bt.prototype, "nativeErrorText", void 0), t([m()], Bt.prototype, "focused", void 0), t([m()], Bt.prototype, "open", void 0), t([m()], Bt.prototype, "defaultFocus", void 0), t([d(".field")], Bt.prototype, "field", void 0), t([d("md-menu")], Bt.prototype, "menu", void 0), t([d("#label")], Bt.prototype, "labelEl", void 0), t([i({
    slot: "leading-icon",
    flatten: !0
})], Bt.prototype, "leadingIcons", void 0);
class $t extends Bt {
    constructor() {
        super(...arguments), this.fieldTag = X `md-filled-field`
    }
}
const Lt = s `:host{--_text-field-active-indicator-color: var(--md-filled-select-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-active-indicator-height: var(--md-filled-select-text-field-active-indicator-height, 1px);--_text-field-container-color: var(--md-filled-select-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_text-field-container-shape-start-start: var( --md-filled-select-text-field-container-shape-start-start, var( --md-filled-select-text-field-container-shape, 4px ) );--_text-field-container-shape-start-end: var( --md-filled-select-text-field-container-shape-start-end, var( --md-filled-select-text-field-container-shape, 4px ) );--_text-field-container-shape-end-end: var( --md-filled-select-text-field-container-shape-end-end, var( --md-filled-select-text-field-container-shape, 0px ) );--_text-field-container-shape-end-start: var( --md-filled-select-text-field-container-shape-end-start, var( --md-filled-select-text-field-container-shape, 0px ) );--_text-field-disabled-active-indicator-color: var(--md-filled-select-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-active-indicator-height: var(--md-filled-select-text-field-disabled-active-indicator-height, 1px);--_text-field-disabled-active-indicator-opacity: var(--md-filled-select-text-field-disabled-active-indicator-opacity, 0.38);--_text-field-disabled-container-color: var(--md-filled-select-text-field-disabled-container-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-container-opacity: var(--md-filled-select-text-field-disabled-container-opacity, 0.04);--_text-field-disabled-input-text-color: var(--md-filled-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-input-text-opacity: var(--md-filled-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-filled-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-label-text-opacity: var(--md-filled-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-filled-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-leading-icon-opacity: var(--md-filled-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-supporting-text-color: var(--md-filled-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-supporting-text-opacity: var(--md-filled-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-filled-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-disabled-trailing-icon-opacity: var(--md-filled-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-active-indicator-color: var(--md-filled-select-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-active-indicator-color: var(--md-filled-select-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-input-text-color: var(--md-filled-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-error-focus-label-text-color: var(--md-filled-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-filled-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-supporting-text-color: var(--md-filled-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-filled-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-active-indicator-color: var(--md-filled-select-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-input-text-color: var(--md-filled-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-error-hover-label-text-color: var(--md-filled-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-filled-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-state-layer-color: var(--md-filled-select-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-error-hover-state-layer-opacity: var(--md-filled-select-text-field-error-hover-state-layer-opacity, 0.08);--_text-field-error-hover-supporting-text-color: var(--md-filled-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-filled-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-filled-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-error-label-text-color: var(--md-filled-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-filled-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-supporting-text-color: var(--md-filled-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-filled-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-active-indicator-color: var(--md-filled-select-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-active-indicator-height: var(--md-filled-select-text-field-focus-active-indicator-height, 3px);--_text-field-focus-input-text-color: var(--md-filled-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-focus-label-text-color: var(--md-filled-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-filled-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-supporting-text-color: var(--md-filled-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-filled-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-active-indicator-color: var(--md-filled-select-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-hover-active-indicator-height: var(--md-filled-select-text-field-hover-active-indicator-height, 1px);--_text-field-hover-input-text-color: var(--md-filled-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-hover-label-text-color: var(--md-filled-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-hover-leading-icon-color: var(--md-filled-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-state-layer-color: var(--md-filled-select-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-hover-state-layer-opacity: var(--md-filled-select-text-field-hover-state-layer-opacity, 0.08);--_text-field-hover-supporting-text-color: var(--md-filled-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-filled-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-filled-select-text-field-input-text-color, var(--md-sys-color-on-surface, #ffffff));--_text-field-input-text-font: var(--md-filled-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-filled-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-filled-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-filled-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-filled-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-filled-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-filled-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-filled-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-filled-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-filled-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-filled-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-filled-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-filled-select-text-field-leading-icon-size, 24px);--_text-field-supporting-text-color: var(--md-filled-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-filled-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-filled-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-filled-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-filled-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-filled-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-filled-select-text-field-trailing-icon-size, 24px);--md-filled-field-active-indicator-color: var(--_text-field-active-indicator-color);--md-filled-field-active-indicator-height: var(--_text-field-active-indicator-height);--md-filled-field-container-color: var(--_text-field-container-color);--md-filled-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-filled-field-content-color: var(--_text-field-input-text-color);--md-filled-field-content-font: var(--_text-field-input-text-font);--md-filled-field-content-line-height: var(--_text-field-input-text-line-height);--md-filled-field-content-size: var(--_text-field-input-text-size);--md-filled-field-content-weight: var(--_text-field-input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_text-field-disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_text-field-disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_text-field-disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_text-field-disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_text-field-disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_text-field-error-active-indicator-color);--md-filled-field-error-content-color: var(--_text-field-error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_text-field-error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_text-field-error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_text-field-error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_text-field-error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-filled-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_text-field-focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_text-field-focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_text-field-hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_text-field-hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_text-field-hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_text-field-hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_text-field-label-text-color);--md-filled-field-label-text-font: var(--_text-field-label-text-font);--md-filled-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-filled-field-label-text-size: var(--_text-field-label-text-size);--md-filled-field-label-text-weight: var(--_text-field-label-text-weight);--md-filled-field-leading-content-color: var(--_text-field-leading-icon-color);--md-filled-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-filled-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-filled-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-filled-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`,
    Ot = s `:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`;
class zt extends $t {}
zt.styles = [Ot, Lt], customElements.define("ew-filled-select", zt);
const Ut = s `:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #ffffff));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #ffffff));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;
class Dt {
    constructor(e, t) {
        this.host = e, this.internalTypeaheadText = null, this.onClick = () => {
            this.host.keepOpen || this.host.dispatchEvent(ot(this.host, {
                kind: at
            }))
        }, this.onKeydown = e => {
            if (this.host.href && "Enter" === e.code) {
                const e = this.getInteractiveElement();
                e instanceof HTMLAnchorElement && e.click()
            }
            if (e.defaultPrevented) return;
            const t = e.code;
            this.host.keepOpen && "Escape" !== t || dt(t) && (e.preventDefault(), this.host.dispatchEvent(ot(this.host, {
                kind: nt,
                key: t
            })))
        }, this.getHeadlineElements = t.getHeadlineElements, this.getSupportingTextElements = t.getSupportingTextElements, this.getDefaultElements = t.getDefaultElements, this.getInteractiveElement = t.getInteractiveElement, this.host.addController(this)
    }
    get typeaheadText() {
        if (null !== this.internalTypeaheadText) return this.internalTypeaheadText;
        const e = this.getHeadlineElements(),
            t = [];
        return e.forEach((e => {
            e.textContent && e.textContent.trim() && t.push(e.textContent.trim())
        })), 0 === t.length && this.getDefaultElements().forEach((e => {
            e.textContent && e.textContent.trim() && t.push(e.textContent.trim())
        })), 0 === t.length && this.getSupportingTextElements().forEach((e => {
            e.textContent && e.textContent.trim() && t.push(e.textContent.trim())
        })), t.join(" ")
    }
    get tagName() {
        switch (this.host.type) {
        case "link":
            return "a";
        case "button":
            return "button";
        default:
            return "li"
        }
    }
    get role() {
        return "option" === this.host.type ? "option" : "menuitem"
    }
    hostConnected() {
        this.host.toggleAttribute("md-menu-item", !0)
    }
    hostUpdate() {
        this.host.href && (this.host.type = "link")
    }
    setTypeaheadText(e) {
        this.internalTypeaheadText = e
    }
}
class Pt {
    get role() {
        return this.menuItemController.role
    }
    get typeaheadText() {
        return this.menuItemController.typeaheadText
    }
    setTypeaheadText(e) {
        this.menuItemController.setTypeaheadText(e)
    }
    get displayText() {
        return null !== this.internalDisplayText ? this.internalDisplayText : this.menuItemController.typeaheadText
    }
    setDisplayText(e) {
        this.internalDisplayText = e
    }
    constructor(e, t) {
        this.host = e, this.internalDisplayText = null, this.lastSelected = this.host.selected, this.firstUpdate = !0, this.onClick = () => {
            this.menuItemController.onClick()
        }, this.onKeydown = e => {
            this.menuItemController.onKeydown(e)
        }, this.menuItemController = new Dt(e, t), e.addController(this)
    }
    hostUpdate() {
        this.lastSelected !== this.host.selected && (this.host.ariaSelected = this.host.selected ? "true" : "false")
    }
    hostUpdated() {
        this.lastSelected === this.host.selected || this.firstUpdate || (this.host.selected ? this.host.dispatchEvent(new Event("request-selection", {
            bubbles: !0,
            composed: !0
        })) : this.host.dispatchEvent(new Event("request-deselection", {
            bubbles: !0,
            composed: !0
        }))), this.lastSelected = this.host.selected, this.firstUpdate = !1
    }
}
class Ft extends r {
    constructor() {
        super(...arguments), this.disabled = !1, this.isMenuItem = !0, this.selected = !1, this.value = "", this.type = "option", this.selectOptionController = new Pt(this, {
            getHeadlineElements: () => this.headlineElements,
            getSupportingTextElements: () => this.supportingTextElements,
            getDefaultElements: () => this.defaultElements,
            getInteractiveElement: () => this.listItemRoot
        })
    }
    get typeaheadText() {
        return this.selectOptionController.typeaheadText
    }
    set typeaheadText(e) {
        this.selectOptionController.setTypeaheadText(e)
    }
    get displayText() {
        return this.selectOptionController.displayText
    }
    set displayText(e) {
        this.selectOptionController.setDisplayText(e)
    }
    render() {
        return this.renderListItem(o `
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)
    }
    renderListItem(e) {
        return o `
      <li
        id="item"
        tabindex=${this.disabled?-1:0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel||c}
        aria-selected=${this.ariaSelected||c}
        aria-checked=${this.ariaChecked||c}
        aria-expanded=${this.ariaExpanded||c}
        aria-haspopup=${this.ariaHasPopup||c}
        class="list-item ${h(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${e}</li
      >
    `
    }
    renderRipple() {
        return o ` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`
    }
    renderFocusRing() {
        return o ` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`
    }
    getRenderClasses() {
        return {
            disabled: this.disabled,
            selected: this.selected
        }
    }
    renderBody() {
        return o `
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `
    }
    focus() {
        this.listItemRoot?.focus()
    }
}
l(Ft), Ft.shadowRootOptions = {
    ...r.shadowRootOptions,
    delegatesFocus: !0
}, t([a({
    type: Boolean,
    reflect: !0
})], Ft.prototype, "disabled", void 0), t([a({
    type: Boolean,
    attribute: "md-menu-item",
    reflect: !0
})], Ft.prototype, "isMenuItem", void 0), t([a({
    type: Boolean
})], Ft.prototype, "selected", void 0), t([a()], Ft.prototype, "value", void 0), t([d(".list-item")], Ft.prototype, "listItemRoot", void 0), t([i({
    slot: "headline"
})], Ft.prototype, "headlineElements", void 0), t([i({
    slot: "supporting-text"
})], Ft.prototype, "supportingTextElements", void 0), t([function (t) {
    return (i, r) => {
        const {
            slot: o
        } = t ?? {}, s = "slot" + (o ? `[name=${o}]` : ":not([name])");
        return e(i, r, {
            get() {
                const e = this.renderRoot?.querySelector(s);
                return e?.assignedNodes(t) ?? []
            }
        })
    }
}({
    slot: ""
})], Ft.prototype, "defaultElements", void 0), t([a({
    attribute: "typeahead-text"
})], Ft.prototype, "typeaheadText", null), t([a({
    attribute: "display-text"
})], Ft.prototype, "displayText", null);
class Mt extends Ft {}
Mt.styles = [Ut], customElements.define("ew-select-option", Mt);
class Nt extends r {
    constructor() {
        super(...arguments), this.value = 0, this.max = 1, this.indeterminate = !1, this.fourColor = !1
    }
    render() {
        const {
            ariaLabel: e
        } = this;
        return o `
      <div
        class="progress ${h(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||c}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?c:this.value}
        >${this.renderIndicator()}</div
      >
    `
    }
    getRenderClasses() {
        return {
            indeterminate: this.indeterminate,
            "four-color": this.fourColor
        }
    }
}
l(Nt), t([a({
    type: Number
})], Nt.prototype, "value", void 0), t([a({
    type: Number
})], Nt.prototype, "max", void 0), t([a({
    type: Boolean
})], Nt.prototype, "indeterminate", void 0), t([a({
    type: Boolean,
    attribute: "four-color"
})], Nt.prototype, "fourColor", void 0);
class Ht extends Nt {
    renderIndicator() {
        return this.indeterminate ? this.renderIndeterminateContainer() : this.renderDeterminateContainer()
    }
    renderDeterminateContainer() {
        const e = 100 * (1 - this.value / this.max);
        return o `
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `
    }
    renderIndeterminateContainer() {
        return o ` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`
    }
}
const qt = s `:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;
class Wt extends Ht {}
Wt.styles = [qt], customElements.define("ew-circular-progress", Wt);
class Zt extends r {
    render() {
        return o `
      <div>
        <ew-circular-progress
          active
          ?indeterminate=${void 0===this.progress}
          .value=${void 0!==this.progress?this.progress/100:void 0}
        ></ew-circular-progress>
        ${void 0!==this.progress?o`<div>${this.progress}%</div>`:""}
      </div>
      ${this.label}
    `
    }
}
Zt.styles = s `
    :host {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    ew-circular-progress {
      margin-bottom: 16px;
    }
  `, t([a()], Zt.prototype, "label", void 0), t([a()], Zt.prototype, "progress", void 0), customElements.define("ewt-page-progress", Zt);
class Vt extends r {
    render() {
        return o `
      <div class="icon">${this.icon}</div>
      ${this.label}
    `
    }
}
Vt.styles = s `
    :host {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .icon {
      font-size: 50px;
      line-height: 80px;
      color: black;
    }
  `, t([a()], Vt.prototype, "icon", void 0), t([a()], Vt.prototype, "label", void 0), customElements.define("ewt-page-message", Vt);
const Gt = T `
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
    />
  </svg>
`,
    jt = T `
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
    />
  </svg>
`,
    Kt = T `
  <svg slot="start" viewBox="0 0 24 24">
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
  </svg>
`,
    Yt = T `
  <svg slot="start" viewBox="0 0 24 24">
    <path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
  </svg>
`,
    Xt = T `
  <svg slot="start" viewBox="0 0 24 24">
    <path d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z" />
  </svg>
`,
    Jt = T `
  <svg slot="start" viewBox="0 0 24 24">
  <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
`,
    Qt = T `
  <svg slot="start" viewBox="0 0 24 24">
    <path d="m12.151 1.5882c-.3262 0-.6523.1291-.8996.3867l-8.3848 8.7354c-.0619.0644-.1223.1368-.1807.2154-.0588.0789-.1151.1638-.1688.2534-.2593.4325-.4552.9749-.5232 1.4555-.0026.018-.0076.0369-.0094.0548-.0121.0987-.0184.1944-.0184.2857v8.0124a1.2731 1.2731 0 001.2731 1.2731h7.8313l-3.4484-3.593a1.7399 1.7399 0 111.0803-1.125l2.6847 2.7972v-10.248a1.7399 1.7399 0 111.5276-0v7.187l2.6702-2.782a1.7399 1.7399 0 111.0566 1.1505l-3.7269 3.8831v2.7299h8.174a1.2471 1.2471 0 001.2471-1.2471v-8.0375c0-.0912-.0059-.1868-.0184-.2855-.0603-.4935-.2636-1.0617-.5326-1.5105-.0537-.0896-.1101-.1745-.1684-.253-.0588-.079-.1191-.1513-.181-.2158l-8.3848-8.7363c-.2473-.2577-.5735-.3866-.8995-.3864" />
  </svg>
`,
    ei = ["I".charCodeAt(0), "M".charCodeAt(0), "P".charCodeAt(0), "R".charCodeAt(0), "O".charCodeAt(0), "V".charCodeAt(0), 1];
var ti, ii;
! function (e) {
    e[e.CURRENT_STATE = 1] = "CURRENT_STATE", e[e.ERROR_STATE = 2] = "ERROR_STATE", e[e.RPC = 3] = "RPC", e[e.RPC_RESULT = 4] = "RPC_RESULT"
}(ti || (ti = {})),
function (e) {
    e[e.READY = 2] = "READY", e[e.PROVISIONING = 3] = "PROVISIONING", e[e.PROVISIONED = 4] = "PROVISIONED"
}(ii || (ii = {}));
const ri = {
    0: "NO_ERROR",
    1: "INVALID_RPC_PACKET",
    2: "UNKNOWN_RPC_COMMAND",
    3: "UNABLE_TO_CONNECT",
    254: "TIMEOUT",
    255: "UNKNOWN_ERROR"
};
class oi extends Error {
    constructor() {
        super("Port is not ready")
    }
}
const si = e => "[" + e.map((e => ((e, t = 2) => {
    let i = e.toString(16).toUpperCase();
    return i.startsWith("-") ? "-0x" + i.substring(1).padStart(t, "0") : "0x" + i.padStart(t, "0")
})(e))).join(", ") + "]";
class ai extends EventTarget {
    constructor(e, t) {
        if (super(), this.port = e, this.logger = t, this.error = 0, null === e.readable) throw new Error("Port is not readable");
        if (null === e.writable) throw new Error("Port is not writable")
    }
    async initialize(e = 1e3) {
        var t;
        if (this.logger.log("Initializing Improv Serial"), this._processInput(), await (t = 1e3, new Promise((e => setTimeout(e, t)))), void 0 === this._reader) throw new oi;
        try {
            await new Promise((async (t, i) => {
                setTimeout((() => i(new Error("Improv Wi-Fi Serial not detected"))), e), await this.requestCurrentState(), t(void 0)
            })), await this.requestInfo()
        } catch (e) {
            throw await this.close(), e
        }
        return this.info
    }
    async close() {
        this._reader && await new Promise((e => {
            this._reader.cancel(), this.addEventListener("disconnect", e, {
                once: !0
            })
        }))
    }
    async requestCurrentState() {
        let e;
        try {
            await new Promise((async (t, i) => {
                this.addEventListener("state-changed", t, {
                    once: !0
                });
                e = this._sendRPCWithResponse(2, []), e.catch((e => {
                    this.removeEventListener("state-changed", t), i(e)
                }))
            }))
        } catch (e) {
            throw this._rpcFeedback = void 0, new Error(`Error fetching current state: ${e}`)
        }
        if (this.state !== ii.PROVISIONED) return void(this._rpcFeedback = void 0);
        const t = await e;
        this.nextUrl = t[0]
    }
    async requestInfo(e) {
        const t = await this._sendRPCWithResponse(3, [], e);
        this.info = {
            firmware: t[0],
            version: t[1],
            name: t[3],
            chipFamily: t[2]
        }
    }
    async provision(e, t, i) {
        const r = new TextEncoder,
            o = r.encode(e),
            s = r.encode(t),
            a = [o.length, ...o, s.length, ...s],
            n = await this._sendRPCWithResponse(1, a, i);
        this.nextUrl = n[0]
    }
    async scan() {
        const e = (await this._sendRPCWithMultipleResponses(4, [])).map((([e, t, i]) => ({
            name: e,
            rssi: parseInt(t),
            secured: "YES" === i
        })));
        return e.sort(((e, t) => e.name.toLocaleLowerCase().localeCompare(t.name.toLocaleLowerCase()))), e
    }
    _sendRPC(e, t) {
        this.writePacketToStream(ti.RPC, [e, t.length, ...t])
    }
    async _sendRPCWithResponse(e, t, i) {
        if (this._rpcFeedback) throw new Error("Only 1 RPC command that requires feedback can be active");
        return await this._awaitRPCResultWithTimeout(new Promise(((i, r) => {
            this._rpcFeedback = {
                command: e,
                resolve: i,
                reject: r
            }, this._sendRPC(e, t)
        })), i)
    }
    async _sendRPCWithMultipleResponses(e, t, i) {
        if (this._rpcFeedback) throw new Error("Only 1 RPC command that requires feedback can be active");
        return await this._awaitRPCResultWithTimeout(new Promise(((i, r) => {
            this._rpcFeedback = {
                command: e,
                resolve: i,
                reject: r,
                receivedData: []
            }, this._sendRPC(e, t)
        })), i)
    }
    async _awaitRPCResultWithTimeout(e, t) {
        return t ? await new Promise(((i, r) => {
            const o = setTimeout((() => this._setError(254)), t);
            e.finally((() => clearTimeout(o))), e.then(i, r)
        })) : await e
    }
    async _processInput() {
        this.logger.debug("Starting read loop"), this._reader = this.port.readable.getReader();
        try {
            let e, t = [],
                i = 0;
            for (;;) {
                const {
                    value: r,
                    done: o
                } = await this._reader.read();
                if (o) break;
                if (r && 0 !== r.length)
                    for (const o of r) {
                        if (!1 === e) {
                            10 === o && (e = void 0);
                            continue
                        }
                        if (!0 === e) {
                            t.push(o), t.length === i && (this._handleIncomingPacket(t), e = void 0, t = []);
                            continue
                        }
                        if (10 === o) {
                            t = [];
                            continue
                        }
                        if (t.push(o), 9 !== t.length) continue;
                        if (e = "IMPROV" === String.fromCharCode(...t.slice(0, 6)), !e) {
                            t = [];
                            continue
                        }
                        i = 9 + t[8] + 1
                    }
            }
        } catch (e) {
            this.logger.error("Error while reading serial port", e)
        } finally {
            this._reader.releaseLock(), this._reader = void 0
        }
        this.logger.debug("Finished read loop"), this.dispatchEvent(new Event("disconnect"))
    }
    _handleIncomingPacket(e) {
        const t = e.slice(6),
            i = t[0],
            r = t[1],
            o = t[2],
            s = t.slice(3, 3 + o);
        if (this.logger.debug("PROCESS", {
                version: i,
                packetType: r,
                packetLength: o,
                data: si(s)
            }), 1 !== i) return void this.logger.error("Received unsupported version", i);
        let a = t[3 + o],
            n = 0;
        for (let t = 0; t < e.length - 1; t++) n += e[t];
        if (n &= 255, n === a)
            if (r === ti.CURRENT_STATE) this.state = s[0], this.dispatchEvent(new CustomEvent("state-changed", {
                detail: this.state
            }));
            else if (r === ti.ERROR_STATE) this._setError(s[0]);
        else if (r === ti.RPC_RESULT) {
            if (!this._rpcFeedback) return void this.logger.error("Received result while not waiting for one");
            const e = s[0];
            if (e !== this._rpcFeedback.command) return void this.logger.error(`Received result for command ${e} but expected ${this._rpcFeedback.command}`);
            const t = [],
                i = s[1];
            let r = 2;
            for (; r < 2 + i;) t.push(String.fromCodePoint(...s.slice(r + 1, r + s[r] + 1))), r += s[r] + 1;
            "receivedData" in this._rpcFeedback ? t.length > 0 ? this._rpcFeedback.receivedData.push(t) : (this._rpcFeedback.resolve(this._rpcFeedback.receivedData), this._rpcFeedback = void 0) : (this._rpcFeedback.resolve(t), this._rpcFeedback = void 0)
        } else this.logger.error("Unable to handle packet", t);
        else this.logger.error(`Received invalid checksum ${a}. Expected ${n}`)
    }
    async writePacketToStream(e, t) {
        const i = new Uint8Array([...ei, e, t.length, ...t, 0, 0]);
        i[i.length - 2] = 255 & i.reduce(((e, t) => e + t), 0), i[i.length - 1] = 10, this.logger.debug("Writing to stream:", si(new Array(...i)));
        const r = this.port.writable.getWriter();
        await r.write(i);
        try {
            r.releaseLock()
        } catch (e) {
            console.error("Ignoring release lock error", e)
        }
    }
    _setError(e) {
        this.error = e, e > 0 && this._rpcFeedback && (this._rpcFeedback.reject(ri[e] || `UNKNOWN_ERROR (${e})`), this._rpcFeedback = void 0), this.dispatchEvent(new CustomEvent("error-changed", {
            detail: this.error
        }))
    }
}
class ni extends Error {}

function li(e) {
    let t = e.length;
    for (; --t >= 0;) e[t] = 0
}
const di = 256,
    ci = 286,
    hi = 30,
    pi = 15,
    fi = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
    ui = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
    mi = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
    vi = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    gi = new Array(576);
li(gi);
const yi = new Array(60);
li(yi);
const bi = new Array(512);
li(bi);
const _i = new Array(256);
li(_i);
const xi = new Array(29);
li(xi);
const wi = new Array(hi);

function Ei(e, t, i, r, o) {
    this.static_tree = e, this.extra_bits = t, this.extra_base = i, this.elems = r, this.max_length = o, this.has_stree = e && e.length
}
let ki, Ai, Si;

function Ri(e, t) {
    this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
}
li(wi);
const Ti = e => e < 256 ? bi[e] : bi[256 + (e >>> 7)],
    Ii = (e, t) => {
        e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
    },
    Ci = (e, t, i) => {
        e.bi_valid > 16 - i ? (e.bi_buf |= t << e.bi_valid & 65535, Ii(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += i - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += i)
    },
    Bi = (e, t, i) => {
        Ci(e, i[2 * t], i[2 * t + 1])
    },
    $i = (e, t) => {
        let i = 0;
        do {
            i |= 1 & e, e >>>= 1, i <<= 1
        } while (--t > 0);
        return i >>> 1
    },
    Li = (e, t, i) => {
        const r = new Array(16);
        let o, s, a = 0;
        for (o = 1; o <= pi; o++) a = a + i[o - 1] << 1, r[o] = a;
        for (s = 0; s <= t; s++) {
            let t = e[2 * s + 1];
            0 !== t && (e[2 * s] = $i(r[t]++, t))
        }
    },
    Oi = e => {
        let t;
        for (t = 0; t < ci; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; t < hi; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
        e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0
    },
    zi = e => {
        e.bi_valid > 8 ? Ii(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
    },
    Ui = (e, t, i, r) => {
        const o = 2 * t,
            s = 2 * i;
        return e[o] < e[s] || e[o] === e[s] && r[t] <= r[i]
    },
    Di = (e, t, i) => {
        const r = e.heap[i];
        let o = i << 1;
        for (; o <= e.heap_len && (o < e.heap_len && Ui(t, e.heap[o + 1], e.heap[o], e.depth) && o++, !Ui(t, r, e.heap[o], e.depth));) e.heap[i] = e.heap[o], i = o, o <<= 1;
        e.heap[i] = r
    },
    Pi = (e, t, i) => {
        let r, o, s, a, n = 0;
        if (0 !== e.sym_next)
            do {
                r = 255 & e.pending_buf[e.sym_buf + n++], r += (255 & e.pending_buf[e.sym_buf + n++]) << 8, o = e.pending_buf[e.sym_buf + n++], 0 === r ? Bi(e, o, t) : (s = _i[o], Bi(e, s + di + 1, t), a = fi[s], 0 !== a && (o -= xi[s], Ci(e, o, a)), r--, s = Ti(r), Bi(e, s, i), a = ui[s], 0 !== a && (r -= wi[s], Ci(e, r, a)))
            } while (n < e.sym_next);
        Bi(e, 256, t)
    },
    Fi = (e, t) => {
        const i = t.dyn_tree,
            r = t.stat_desc.static_tree,
            o = t.stat_desc.has_stree,
            s = t.stat_desc.elems;
        let a, n, l, d = -1;
        for (e.heap_len = 0, e.heap_max = 573, a = 0; a < s; a++) 0 !== i[2 * a] ? (e.heap[++e.heap_len] = d = a, e.depth[a] = 0) : i[2 * a + 1] = 0;
        for (; e.heap_len < 2;) l = e.heap[++e.heap_len] = d < 2 ? ++d : 0, i[2 * l] = 1, e.depth[l] = 0, e.opt_len--, o && (e.static_len -= r[2 * l + 1]);
        for (t.max_code = d, a = e.heap_len >> 1; a >= 1; a--) Di(e, i, a);
        l = s;
        do {
            a = e.heap[1], e.heap[1] = e.heap[e.heap_len--], Di(e, i, 1), n = e.heap[1], e.heap[--e.heap_max] = a, e.heap[--e.heap_max] = n, i[2 * l] = i[2 * a] + i[2 * n], e.depth[l] = (e.depth[a] >= e.depth[n] ? e.depth[a] : e.depth[n]) + 1, i[2 * a + 1] = i[2 * n + 1] = l, e.heap[1] = l++, Di(e, i, 1)
        } while (e.heap_len >= 2);
        e.heap[--e.heap_max] = e.heap[1], ((e, t) => {
            const i = t.dyn_tree,
                r = t.max_code,
                o = t.stat_desc.static_tree,
                s = t.stat_desc.has_stree,
                a = t.stat_desc.extra_bits,
                n = t.stat_desc.extra_base,
                l = t.stat_desc.max_length;
            let d, c, h, p, f, u, m = 0;
            for (p = 0; p <= pi; p++) e.bl_count[p] = 0;
            for (i[2 * e.heap[e.heap_max] + 1] = 0, d = e.heap_max + 1; d < 573; d++) c = e.heap[d], p = i[2 * i[2 * c + 1] + 1] + 1, p > l && (p = l, m++), i[2 * c + 1] = p, c > r || (e.bl_count[p]++, f = 0, c >= n && (f = a[c - n]), u = i[2 * c], e.opt_len += u * (p + f), s && (e.static_len += u * (o[2 * c + 1] + f)));
            if (0 !== m) {
                do {
                    for (p = l - 1; 0 === e.bl_count[p];) p--;
                    e.bl_count[p]--, e.bl_count[p + 1] += 2, e.bl_count[l]--, m -= 2
                } while (m > 0);
                for (p = l; 0 !== p; p--)
                    for (c = e.bl_count[p]; 0 !== c;) h = e.heap[--d], h > r || (i[2 * h + 1] !== p && (e.opt_len += (p - i[2 * h + 1]) * i[2 * h], i[2 * h + 1] = p), c--)
            }
        })(e, t), Li(i, d, e.bl_count)
    },
    Mi = (e, t, i) => {
        let r, o, s = -1,
            a = t[1],
            n = 0,
            l = 7,
            d = 4;
        for (0 === a && (l = 138, d = 3), t[2 * (i + 1) + 1] = 65535, r = 0; r <= i; r++) o = a, a = t[2 * (r + 1) + 1], ++n < l && o === a || (n < d ? e.bl_tree[2 * o] += n : 0 !== o ? (o !== s && e.bl_tree[2 * o]++, e.bl_tree[32]++) : n <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, n = 0, s = o, 0 === a ? (l = 138, d = 3) : o === a ? (l = 6, d = 3) : (l = 7, d = 4))
    },
    Ni = (e, t, i) => {
        let r, o, s = -1,
            a = t[1],
            n = 0,
            l = 7,
            d = 4;
        for (0 === a && (l = 138, d = 3), r = 0; r <= i; r++)
            if (o = a, a = t[2 * (r + 1) + 1], !(++n < l && o === a)) {
                if (n < d)
                    do {
                        Bi(e, o, e.bl_tree)
                    } while (0 != --n);
                else 0 !== o ? (o !== s && (Bi(e, o, e.bl_tree), n--), Bi(e, 16, e.bl_tree), Ci(e, n - 3, 2)) : n <= 10 ? (Bi(e, 17, e.bl_tree), Ci(e, n - 3, 3)) : (Bi(e, 18, e.bl_tree), Ci(e, n - 11, 7));
                n = 0, s = o, 0 === a ? (l = 138, d = 3) : o === a ? (l = 6, d = 3) : (l = 7, d = 4)
            }
    };
let Hi = !1;
const qi = (e, t, i, r) => {
    Ci(e, 0 + (r ? 1 : 0), 3), zi(e), Ii(e, i), Ii(e, ~i), i && e.pending_buf.set(e.window.subarray(t, t + i), e.pending), e.pending += i
};
var Wi = e => {
        Hi || ((() => {
            let e, t, i, r, o;
            const s = new Array(16);
            for (i = 0, r = 0; r < 28; r++)
                for (xi[r] = i, e = 0; e < 1 << fi[r]; e++) _i[i++] = r;
            for (_i[i - 1] = r, o = 0, r = 0; r < 16; r++)
                for (wi[r] = o, e = 0; e < 1 << ui[r]; e++) bi[o++] = r;
            for (o >>= 7; r < hi; r++)
                for (wi[r] = o << 7, e = 0; e < 1 << ui[r] - 7; e++) bi[256 + o++] = r;
            for (t = 0; t <= pi; t++) s[t] = 0;
            for (e = 0; e <= 143;) gi[2 * e + 1] = 8, e++, s[8]++;
            for (; e <= 255;) gi[2 * e + 1] = 9, e++, s[9]++;
            for (; e <= 279;) gi[2 * e + 1] = 7, e++, s[7]++;
            for (; e <= 287;) gi[2 * e + 1] = 8, e++, s[8]++;
            for (Li(gi, 287, s), e = 0; e < hi; e++) yi[2 * e + 1] = 5, yi[2 * e] = $i(e, 5);
            ki = new Ei(gi, fi, 257, ci, pi), Ai = new Ei(yi, ui, 0, hi, pi), Si = new Ei(new Array(0), mi, 0, 19, 7)
        })(), Hi = !0), e.l_desc = new Ri(e.dyn_ltree, ki), e.d_desc = new Ri(e.dyn_dtree, Ai), e.bl_desc = new Ri(e.bl_tree, Si), e.bi_buf = 0, e.bi_valid = 0, Oi(e)
    },
    Zi = (e, t, i, r) => {
        let o, s, a = 0;
        e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = (e => {
            let t, i = 4093624447;
            for (t = 0; t <= 31; t++, i >>>= 1)
                if (1 & i && 0 !== e.dyn_ltree[2 * t]) return 0;
            if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
            for (t = 32; t < di; t++)
                if (0 !== e.dyn_ltree[2 * t]) return 1;
            return 0
        })(e)), Fi(e, e.l_desc), Fi(e, e.d_desc), a = (e => {
            let t;
            for (Mi(e, e.dyn_ltree, e.l_desc.max_code), Mi(e, e.dyn_dtree, e.d_desc.max_code), Fi(e, e.bl_desc), t = 18; t >= 3 && 0 === e.bl_tree[2 * vi[t] + 1]; t--);
            return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
        })(e), o = e.opt_len + 3 + 7 >>> 3, s = e.static_len + 3 + 7 >>> 3, s <= o && (o = s)) : o = s = i + 5, i + 4 <= o && -1 !== t ? qi(e, t, i, r) : 4 === e.strategy || s === o ? (Ci(e, 2 + (r ? 1 : 0), 3), Pi(e, gi, yi)) : (Ci(e, 4 + (r ? 1 : 0), 3), ((e, t, i, r) => {
            let o;
            for (Ci(e, t - 257, 5), Ci(e, i - 1, 5), Ci(e, r - 4, 4), o = 0; o < r; o++) Ci(e, e.bl_tree[2 * vi[o] + 1], 3);
            Ni(e, e.dyn_ltree, t - 1), Ni(e, e.dyn_dtree, i - 1)
        })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), Pi(e, e.dyn_ltree, e.dyn_dtree)), Oi(e), r && zi(e)
    },
    Vi = (e, t, i) => (e.pending_buf[e.sym_buf + e.sym_next++] = t, e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = i, 0 === t ? e.dyn_ltree[2 * i]++ : (e.matches++, t--, e.dyn_ltree[2 * (_i[i] + di + 1)]++, e.dyn_dtree[2 * Ti(t)]++), e.sym_next === e.sym_end),
    Gi = e => {
        Ci(e, 2, 3), Bi(e, 256, gi), (e => {
            16 === e.bi_valid ? (Ii(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
        })(e)
    },
    ji = {
        _tr_init: Wi,
        _tr_stored_block: qi,
        _tr_flush_block: Zi,
        _tr_tally: Vi,
        _tr_align: Gi
    };
var Ki = (e, t, i, r) => {
    let o = 65535 & e | 0,
        s = e >>> 16 & 65535 | 0,
        a = 0;
    for (; 0 !== i;) {
        a = i > 2e3 ? 2e3 : i, i -= a;
        do {
            o = o + t[r++] | 0, s = s + o | 0
        } while (--a);
        o %= 65521, s %= 65521
    }
    return o | s << 16 | 0
};
const Yi = new Uint32Array((() => {
    let e, t = [];
    for (var i = 0; i < 256; i++) {
        e = i;
        for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
        t[i] = e
    }
    return t
})());
var Xi = (e, t, i, r) => {
        const o = Yi,
            s = r + i;
        e ^= -1;
        for (let i = r; i < s; i++) e = e >>> 8 ^ o[255 & (e ^ t[i])];
        return -1 ^ e
    },
    Ji = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    },
    Qi = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
    };
const {
    _tr_init: er,
    _tr_stored_block: tr,
    _tr_flush_block: ir,
    _tr_tally: rr,
    _tr_align: or
} = ji, {
    Z_NO_FLUSH: sr,
    Z_PARTIAL_FLUSH: ar,
    Z_FULL_FLUSH: nr,
    Z_FINISH: lr,
    Z_BLOCK: dr,
    Z_OK: cr,
    Z_STREAM_END: hr,
    Z_STREAM_ERROR: pr,
    Z_DATA_ERROR: fr,
    Z_BUF_ERROR: ur,
    Z_DEFAULT_COMPRESSION: mr,
    Z_FILTERED: vr,
    Z_HUFFMAN_ONLY: gr,
    Z_RLE: yr,
    Z_FIXED: br,
    Z_DEFAULT_STRATEGY: _r,
    Z_UNKNOWN: xr,
    Z_DEFLATED: wr
} = Qi, Er = 258, kr = 262, Ar = 42, Sr = 113, Rr = 666, Tr = (e, t) => (e.msg = Ji[t], t), Ir = e => 2 * e - (e > 4 ? 9 : 0), Cr = e => {
    let t = e.length;
    for (; --t >= 0;) e[t] = 0
}, Br = e => {
    let t, i, r, o = e.w_size;
    t = e.hash_size, r = t;
    do {
        i = e.head[--r], e.head[r] = i >= o ? i - o : 0
    } while (--t);
    t = o, r = t;
    do {
        i = e.prev[--r], e.prev[r] = i >= o ? i - o : 0
    } while (--t)
};
let $r = (e, t, i) => (t << e.hash_shift ^ i) & e.hash_mask;
const Lr = e => {
        const t = e.state;
        let i = t.pending;
        i > e.avail_out && (i = e.avail_out), 0 !== i && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + i), e.next_out), e.next_out += i, t.pending_out += i, e.total_out += i, e.avail_out -= i, t.pending -= i, 0 === t.pending && (t.pending_out = 0))
    },
    Or = (e, t) => {
        ir(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, Lr(e.strm)
    },
    zr = (e, t) => {
        e.pending_buf[e.pending++] = t
    },
    Ur = (e, t) => {
        e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
    },
    Dr = (e, t, i, r) => {
        let o = e.avail_in;
        return o > r && (o = r), 0 === o ? 0 : (e.avail_in -= o, t.set(e.input.subarray(e.next_in, e.next_in + o), i), 1 === e.state.wrap ? e.adler = Ki(e.adler, t, o, i) : 2 === e.state.wrap && (e.adler = Xi(e.adler, t, o, i)), e.next_in += o, e.total_in += o, o)
    },
    Pr = (e, t) => {
        let i, r, o = e.max_chain_length,
            s = e.strstart,
            a = e.prev_length,
            n = e.nice_match;
        const l = e.strstart > e.w_size - kr ? e.strstart - (e.w_size - kr) : 0,
            d = e.window,
            c = e.w_mask,
            h = e.prev,
            p = e.strstart + Er;
        let f = d[s + a - 1],
            u = d[s + a];
        e.prev_length >= e.good_match && (o >>= 2), n > e.lookahead && (n = e.lookahead);
        do {
            if (i = t, d[i + a] === u && d[i + a - 1] === f && d[i] === d[s] && d[++i] === d[s + 1]) {
                s += 2, i++;
                do {} while (d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && d[++s] === d[++i] && s < p);
                if (r = Er - (p - s), s = p - Er, r > a) {
                    if (e.match_start = t, a = r, r >= n) break;
                    f = d[s + a - 1], u = d[s + a]
                }
            }
        } while ((t = h[t & c]) > l && 0 != --o);
        return a <= e.lookahead ? a : e.lookahead
    },
    Fr = e => {
        const t = e.w_size;
        let i, r, o;
        do {
            if (r = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - kr) && (e.window.set(e.window.subarray(t, t + t - r), 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, e.insert > e.strstart && (e.insert = e.strstart), Br(e), r += t), 0 === e.strm.avail_in) break;
            if (i = Dr(e.strm, e.window, e.strstart + e.lookahead, r), e.lookahead += i, e.lookahead + e.insert >= 3)
                for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = $r(e, e.ins_h, e.window[o + 1]); e.insert && (e.ins_h = $r(e, e.ins_h, e.window[o + 3 - 1]), e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < 3)););
        } while (e.lookahead < kr && 0 !== e.strm.avail_in)
    },
    Mr = (e, t) => {
        let i, r, o, s = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5,
            a = 0,
            n = e.strm.avail_in;
        do {
            if (i = 65535, o = e.bi_valid + 42 >> 3, e.strm.avail_out < o) break;
            if (o = e.strm.avail_out - o, r = e.strstart - e.block_start, i > r + e.strm.avail_in && (i = r + e.strm.avail_in), i > o && (i = o), i < s && (0 === i && t !== lr || t === sr || i !== r + e.strm.avail_in)) break;
            a = t === lr && i === r + e.strm.avail_in ? 1 : 0, tr(e, 0, 0, a), e.pending_buf[e.pending - 4] = i, e.pending_buf[e.pending - 3] = i >> 8, e.pending_buf[e.pending - 2] = ~i, e.pending_buf[e.pending - 1] = ~i >> 8, Lr(e.strm), r && (r > i && (r = i), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + r), e.strm.next_out), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r, e.block_start += r, i -= r), i && (Dr(e.strm, e.strm.output, e.strm.next_out, i), e.strm.next_out += i, e.strm.avail_out -= i, e.strm.total_out += i)
        } while (0 === a);
        return n -= e.strm.avail_in, n && (n >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= n && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - n, e.strm.next_in), e.strstart), e.strstart += n, e.insert += n > e.w_size - e.insert ? e.w_size - e.insert : n), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), a ? 4 : t !== sr && t !== lr && 0 === e.strm.avail_in && e.strstart === e.block_start ? 2 : (o = e.window_size - e.strstart, e.strm.avail_in > o && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, o += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), o > e.strm.avail_in && (o = e.strm.avail_in), o && (Dr(e.strm, e.window, e.strstart, o), e.strstart += o, e.insert += o > e.w_size - e.insert ? e.w_size - e.insert : o), e.high_water < e.strstart && (e.high_water = e.strstart), o = e.bi_valid + 42 >> 3, o = e.pending_buf_size - o > 65535 ? 65535 : e.pending_buf_size - o, s = o > e.w_size ? e.w_size : o, r = e.strstart - e.block_start, (r >= s || (r || t === lr) && t !== sr && 0 === e.strm.avail_in && r <= o) && (i = r > o ? o : r, a = t === lr && 0 === e.strm.avail_in && i === r ? 1 : 0, tr(e, e.block_start, i, a), e.block_start += i, Lr(e.strm)), a ? 3 : 1)
    },
    Nr = (e, t) => {
        let i, r;
        for (;;) {
            if (e.lookahead < kr) {
                if (Fr(e), e.lookahead < kr && t === sr) return 1;
                if (0 === e.lookahead) break
            }
            if (i = 0, e.lookahead >= 3 && (e.ins_h = $r(e, e.ins_h, e.window[e.strstart + 3 - 1]), i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== i && e.strstart - i <= e.w_size - kr && (e.match_length = Pr(e, i)), e.match_length >= 3)
                if (r = rr(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
                    e.match_length--;
                    do {
                        e.strstart++, e.ins_h = $r(e, e.ins_h, e.window[e.strstart + 3 - 1]), i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart
                    } while (0 != --e.match_length);
                    e.strstart++
                } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = $r(e, e.ins_h, e.window[e.strstart + 1]);
            else r = rr(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
            if (r && (Or(e, !1), 0 === e.strm.avail_out)) return 1
        }
        return e.insert = e.strstart < 2 ? e.strstart : 2, t === lr ? (Or(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Or(e, !1), 0 === e.strm.avail_out) ? 1 : 2
    },
    Hr = (e, t) => {
        let i, r, o;
        for (;;) {
            if (e.lookahead < kr) {
                if (Fr(e), e.lookahead < kr && t === sr) return 1;
                if (0 === e.lookahead) break
            }
            if (i = 0, e.lookahead >= 3 && (e.ins_h = $r(e, e.ins_h, e.window[e.strstart + 3 - 1]), i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== i && e.prev_length < e.max_lazy_match && e.strstart - i <= e.w_size - kr && (e.match_length = Pr(e, i), e.match_length <= 5 && (e.strategy === vr || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
                o = e.strstart + e.lookahead - 3, r = rr(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                do {
                    ++e.strstart <= o && (e.ins_h = $r(e, e.ins_h, e.window[e.strstart + 3 - 1]), i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart)
                } while (0 != --e.prev_length);
                if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (Or(e, !1), 0 === e.strm.avail_out)) return 1
            } else if (e.match_available) {
                if (r = rr(e, 0, e.window[e.strstart - 1]), r && Or(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
            } else e.match_available = 1, e.strstart++, e.lookahead--
        }
        return e.match_available && (r = rr(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === lr ? (Or(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Or(e, !1), 0 === e.strm.avail_out) ? 1 : 2
    };

function qr(e, t, i, r, o) {
    this.good_length = e, this.max_lazy = t, this.nice_length = i, this.max_chain = r, this.func = o
}
const Wr = [new qr(0, 0, 0, 0, Mr), new qr(4, 4, 8, 4, Nr), new qr(4, 5, 16, 8, Nr), new qr(4, 6, 32, 32, Nr), new qr(4, 4, 16, 16, Hr), new qr(8, 16, 32, 32, Hr), new qr(8, 16, 128, 128, Hr), new qr(8, 32, 128, 256, Hr), new qr(32, 128, 258, 1024, Hr), new qr(32, 258, 258, 4096, Hr)];

function Zr() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = wr, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), Cr(this.dyn_ltree), Cr(this.dyn_dtree), Cr(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), Cr(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), Cr(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
}
const Vr = e => {
        if (!e) return 1;
        const t = e.state;
        return !t || t.strm !== e || t.status !== Ar && 57 !== t.status && 69 !== t.status && 73 !== t.status && 91 !== t.status && 103 !== t.status && t.status !== Sr && t.status !== Rr ? 1 : 0
    },
    Gr = e => {
        if (Vr(e)) return Tr(e, pr);
        e.total_in = e.total_out = 0, e.data_type = xr;
        const t = e.state;
        return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = 2 === t.wrap ? 57 : t.wrap ? Ar : Sr, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = -2, er(t), cr
    },
    jr = e => {
        const t = Gr(e);
        return t === cr && (e => {
            e.window_size = 2 * e.w_size, Cr(e.head), e.max_lazy_match = Wr[e.level].max_lazy, e.good_match = Wr[e.level].good_length, e.nice_match = Wr[e.level].nice_length, e.max_chain_length = Wr[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0
        })(e.state), t
    },
    Kr = (e, t, i, r, o, s) => {
        if (!e) return pr;
        let a = 1;
        if (t === mr && (t = 6), r < 0 ? (a = 0, r = -r) : r > 15 && (a = 2, r -= 16), o < 1 || o > 9 || i !== wr || r < 8 || r > 15 || t < 0 || t > 9 || s < 0 || s > br || 8 === r && 1 !== a) return Tr(e, pr);
        8 === r && (r = 9);
        const n = new Zr;
        return e.state = n, n.strm = e, n.status = Ar, n.wrap = a, n.gzhead = null, n.w_bits = r, n.w_size = 1 << n.w_bits, n.w_mask = n.w_size - 1, n.hash_bits = o + 7, n.hash_size = 1 << n.hash_bits, n.hash_mask = n.hash_size - 1, n.hash_shift = ~~((n.hash_bits + 3 - 1) / 3), n.window = new Uint8Array(2 * n.w_size), n.head = new Uint16Array(n.hash_size), n.prev = new Uint16Array(n.w_size), n.lit_bufsize = 1 << o + 6, n.pending_buf_size = 4 * n.lit_bufsize, n.pending_buf = new Uint8Array(n.pending_buf_size), n.sym_buf = n.lit_bufsize, n.sym_end = 3 * (n.lit_bufsize - 1), n.level = t, n.strategy = s, n.method = i, jr(e)
    };
var Yr = (e, t) => {
        if (Vr(e) || t > dr || t < 0) return e ? Tr(e, pr) : pr;
        const i = e.state;
        if (!e.output || 0 !== e.avail_in && !e.input || i.status === Rr && t !== lr) return Tr(e, 0 === e.avail_out ? ur : pr);
        const r = i.last_flush;
        if (i.last_flush = t, 0 !== i.pending) {
            if (Lr(e), 0 === e.avail_out) return i.last_flush = -1, cr
        } else if (0 === e.avail_in && Ir(t) <= Ir(r) && t !== lr) return Tr(e, ur);
        if (i.status === Rr && 0 !== e.avail_in) return Tr(e, ur);
        if (i.status === Ar && 0 === i.wrap && (i.status = Sr), i.status === Ar) {
            let t = wr + (i.w_bits - 8 << 4) << 8,
                r = -1;
            if (r = i.strategy >= gr || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3, t |= r << 6, 0 !== i.strstart && (t |= 32), t += 31 - t % 31, Ur(i, t), 0 !== i.strstart && (Ur(i, e.adler >>> 16), Ur(i, 65535 & e.adler)), e.adler = 1, i.status = Sr, Lr(e), 0 !== i.pending) return i.last_flush = -1, cr
        }
        if (57 === i.status)
            if (e.adler = 0, zr(i, 31), zr(i, 139), zr(i, 8), i.gzhead) zr(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), zr(i, 255 & i.gzhead.time), zr(i, i.gzhead.time >> 8 & 255), zr(i, i.gzhead.time >> 16 & 255), zr(i, i.gzhead.time >> 24 & 255), zr(i, 9 === i.level ? 2 : i.strategy >= gr || i.level < 2 ? 4 : 0), zr(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (zr(i, 255 & i.gzhead.extra.length), zr(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = Xi(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69;
            else if (zr(i, 0), zr(i, 0), zr(i, 0), zr(i, 0), zr(i, 0), zr(i, 9 === i.level ? 2 : i.strategy >= gr || i.level < 2 ? 4 : 0), zr(i, 3), i.status = Sr, Lr(e), 0 !== i.pending) return i.last_flush = -1, cr;
        if (69 === i.status) {
            if (i.gzhead.extra) {
                let t = i.pending,
                    r = (65535 & i.gzhead.extra.length) - i.gzindex;
                for (; i.pending + r > i.pending_buf_size;) {
                    let o = i.pending_buf_size - i.pending;
                    if (i.pending_buf.set(i.gzhead.extra.subarray(i.gzindex, i.gzindex + o), i.pending), i.pending = i.pending_buf_size, i.gzhead.hcrc && i.pending > t && (e.adler = Xi(e.adler, i.pending_buf, i.pending - t, t)), i.gzindex += o, Lr(e), 0 !== i.pending) return i.last_flush = -1, cr;
                    t = 0, r -= o
                }
                let o = new Uint8Array(i.gzhead.extra);
                i.pending_buf.set(o.subarray(i.gzindex, i.gzindex + r), i.pending), i.pending += r, i.gzhead.hcrc && i.pending > t && (e.adler = Xi(e.adler, i.pending_buf, i.pending - t, t)), i.gzindex = 0
            }
            i.status = 73
        }
        if (73 === i.status) {
            if (i.gzhead.name) {
                let t, r = i.pending;
                do {
                    if (i.pending === i.pending_buf_size) {
                        if (i.gzhead.hcrc && i.pending > r && (e.adler = Xi(e.adler, i.pending_buf, i.pending - r, r)), Lr(e), 0 !== i.pending) return i.last_flush = -1, cr;
                        r = 0
                    }
                    t = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, zr(i, t)
                } while (0 !== t);
                i.gzhead.hcrc && i.pending > r && (e.adler = Xi(e.adler, i.pending_buf, i.pending - r, r)), i.gzindex = 0
            }
            i.status = 91
        }
        if (91 === i.status) {
            if (i.gzhead.comment) {
                let t, r = i.pending;
                do {
                    if (i.pending === i.pending_buf_size) {
                        if (i.gzhead.hcrc && i.pending > r && (e.adler = Xi(e.adler, i.pending_buf, i.pending - r, r)), Lr(e), 0 !== i.pending) return i.last_flush = -1, cr;
                        r = 0
                    }
                    t = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, zr(i, t)
                } while (0 !== t);
                i.gzhead.hcrc && i.pending > r && (e.adler = Xi(e.adler, i.pending_buf, i.pending - r, r))
            }
            i.status = 103
        }
        if (103 === i.status) {
            if (i.gzhead.hcrc) {
                if (i.pending + 2 > i.pending_buf_size && (Lr(e), 0 !== i.pending)) return i.last_flush = -1, cr;
                zr(i, 255 & e.adler), zr(i, e.adler >> 8 & 255), e.adler = 0
            }
            if (i.status = Sr, Lr(e), 0 !== i.pending) return i.last_flush = -1, cr
        }
        if (0 !== e.avail_in || 0 !== i.lookahead || t !== sr && i.status !== Rr) {
            let r = 0 === i.level ? Mr(i, t) : i.strategy === gr ? ((e, t) => {
                let i;
                for (;;) {
                    if (0 === e.lookahead && (Fr(e), 0 === e.lookahead)) {
                        if (t === sr) return 1;
                        break
                    }
                    if (e.match_length = 0, i = rr(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, i && (Or(e, !1), 0 === e.strm.avail_out)) return 1
                }
                return e.insert = 0, t === lr ? (Or(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Or(e, !1), 0 === e.strm.avail_out) ? 1 : 2
            })(i, t) : i.strategy === yr ? ((e, t) => {
                let i, r, o, s;
                const a = e.window;
                for (;;) {
                    if (e.lookahead <= Er) {
                        if (Fr(e), e.lookahead <= Er && t === sr) return 1;
                        if (0 === e.lookahead) break
                    }
                    if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (o = e.strstart - 1, r = a[o], r === a[++o] && r === a[++o] && r === a[++o])) {
                        s = e.strstart + Er;
                        do {} while (r === a[++o] && r === a[++o] && r === a[++o] && r === a[++o] && r === a[++o] && r === a[++o] && r === a[++o] && r === a[++o] && o < s);
                        e.match_length = Er - (s - o), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                    }
                    if (e.match_length >= 3 ? (i = rr(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (i = rr(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), i && (Or(e, !1), 0 === e.strm.avail_out)) return 1
                }
                return e.insert = 0, t === lr ? (Or(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Or(e, !1), 0 === e.strm.avail_out) ? 1 : 2
            })(i, t) : Wr[i.level].func(i, t);
            if (3 !== r && 4 !== r || (i.status = Rr), 1 === r || 3 === r) return 0 === e.avail_out && (i.last_flush = -1), cr;
            if (2 === r && (t === ar ? or(i) : t !== dr && (tr(i, 0, 0, !1), t === nr && (Cr(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), Lr(e), 0 === e.avail_out)) return i.last_flush = -1, cr
        }
        return t !== lr ? cr : i.wrap <= 0 ? hr : (2 === i.wrap ? (zr(i, 255 & e.adler), zr(i, e.adler >> 8 & 255), zr(i, e.adler >> 16 & 255), zr(i, e.adler >> 24 & 255), zr(i, 255 & e.total_in), zr(i, e.total_in >> 8 & 255), zr(i, e.total_in >> 16 & 255), zr(i, e.total_in >> 24 & 255)) : (Ur(i, e.adler >>> 16), Ur(i, 65535 & e.adler)), Lr(e), i.wrap > 0 && (i.wrap = -i.wrap), 0 !== i.pending ? cr : hr)
    },
    Xr = (e, t) => {
        let i = t.length;
        if (Vr(e)) return pr;
        const r = e.state,
            o = r.wrap;
        if (2 === o || 1 === o && r.status !== Ar || r.lookahead) return pr;
        if (1 === o && (e.adler = Ki(e.adler, t, i, 0)), r.wrap = 0, i >= r.w_size) {
            0 === o && (Cr(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
            let e = new Uint8Array(r.w_size);
            e.set(t.subarray(i - r.w_size, i), 0), t = e, i = r.w_size
        }
        const s = e.avail_in,
            a = e.next_in,
            n = e.input;
        for (e.avail_in = i, e.next_in = 0, e.input = t, Fr(r); r.lookahead >= 3;) {
            let e = r.strstart,
                t = r.lookahead - 2;
            do {
                r.ins_h = $r(r, r.ins_h, r.window[e + 3 - 1]), r.prev[e & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = e, e++
            } while (--t);
            r.strstart = e, r.lookahead = 2, Fr(r)
        }
        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = a, e.input = n, e.avail_in = s, r.wrap = o, cr
    },
    Jr = {
        deflateInit: (e, t) => Kr(e, t, wr, 15, 8, _r),
        deflateInit2: Kr,
        deflateReset: jr,
        deflateResetKeep: Gr,
        deflateSetHeader: (e, t) => Vr(e) || 2 !== e.state.wrap ? pr : (e.state.gzhead = t, cr),
        deflate: Yr,
        deflateEnd: e => {
            if (Vr(e)) return pr;
            const t = e.state.status;
            return e.state = null, t === Sr ? Tr(e, fr) : cr
        },
        deflateSetDictionary: Xr,
        deflateInfo: "pako deflate (from Nodeca project)"
    };
const Qr = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
var eo = {
    assign: function (e) {
        const t = Array.prototype.slice.call(arguments, 1);
        for (; t.length;) {
            const i = t.shift();
            if (i) {
                if ("object" != typeof i) throw new TypeError(i + "must be non-object");
                for (const t in i) Qr(i, t) && (e[t] = i[t])
            }
        }
        return e
    },
    flattenChunks: e => {
        let t = 0;
        for (let i = 0, r = e.length; i < r; i++) t += e[i].length;
        const i = new Uint8Array(t);
        for (let t = 0, r = 0, o = e.length; t < o; t++) {
            let o = e[t];
            i.set(o, r), r += o.length
        }
        return i
    }
};
let to = !0;
try {
    String.fromCharCode.apply(null, new Uint8Array(1))
} catch (e) {
    to = !1
}
const io = new Uint8Array(256);
for (let e = 0; e < 256; e++) io[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
io[254] = io[254] = 1;
var ro = {
    string2buf: e => {
        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return (new TextEncoder).encode(e);
        let t, i, r, o, s, a = e.length,
            n = 0;
        for (o = 0; o < a; o++) i = e.charCodeAt(o), 55296 == (64512 & i) && o + 1 < a && (r = e.charCodeAt(o + 1), 56320 == (64512 & r) && (i = 65536 + (i - 55296 << 10) + (r - 56320), o++)), n += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (t = new Uint8Array(n), s = 0, o = 0; s < n; o++) i = e.charCodeAt(o), 55296 == (64512 & i) && o + 1 < a && (r = e.charCodeAt(o + 1), 56320 == (64512 & r) && (i = 65536 + (i - 55296 << 10) + (r - 56320), o++)), i < 128 ? t[s++] = i : i < 2048 ? (t[s++] = 192 | i >>> 6, t[s++] = 128 | 63 & i) : i < 65536 ? (t[s++] = 224 | i >>> 12, t[s++] = 128 | i >>> 6 & 63, t[s++] = 128 | 63 & i) : (t[s++] = 240 | i >>> 18, t[s++] = 128 | i >>> 12 & 63, t[s++] = 128 | i >>> 6 & 63, t[s++] = 128 | 63 & i);
        return t
    },
    buf2string: (e, t) => {
        const i = t || e.length;
        if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return (new TextDecoder).decode(e.subarray(0, t));
        let r, o;
        const s = new Array(2 * i);
        for (o = 0, r = 0; r < i;) {
            let t = e[r++];
            if (t < 128) {
                s[o++] = t;
                continue
            }
            let a = io[t];
            if (a > 4) s[o++] = 65533, r += a - 1;
            else {
                for (t &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < i;) t = t << 6 | 63 & e[r++], a--;
                a > 1 ? s[o++] = 65533 : t < 65536 ? s[o++] = t : (t -= 65536, s[o++] = 55296 | t >> 10 & 1023, s[o++] = 56320 | 1023 & t)
            }
        }
        return ((e, t) => {
            if (t < 65534 && e.subarray && to) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
            let i = "";
            for (let r = 0; r < t; r++) i += String.fromCharCode(e[r]);
            return i
        })(s, o)
    },
    utf8border: (e, t) => {
        (t = t || e.length) > e.length && (t = e.length);
        let i = t - 1;
        for (; i >= 0 && 128 == (192 & e[i]);) i--;
        return i < 0 || 0 === i ? t : i + io[e[i]] > t ? i : t
    }
};
var oo = function () {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
};
const so = Object.prototype.toString,
    {
        Z_NO_FLUSH: ao,
        Z_SYNC_FLUSH: no,
        Z_FULL_FLUSH: lo,
        Z_FINISH: co,
        Z_OK: ho,
        Z_STREAM_END: po,
        Z_DEFAULT_COMPRESSION: fo,
        Z_DEFAULT_STRATEGY: uo,
        Z_DEFLATED: mo
    } = Qi;

function vo(e) {
    this.options = eo.assign({
        level: fo,
        method: mo,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: uo
    }, e || {});
    let t = this.options;
    t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new oo, this.strm.avail_out = 0;
    let i = Jr.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
    if (i !== ho) throw new Error(Ji[i]);
    if (t.header && Jr.deflateSetHeader(this.strm, t.header), t.dictionary) {
        let e;
        if (e = "string" == typeof t.dictionary ? ro.string2buf(t.dictionary) : "[object ArrayBuffer]" === so.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, i = Jr.deflateSetDictionary(this.strm, e), i !== ho) throw new Error(Ji[i]);
        this._dict_set = !0
    }
}

function go(e, t) {
    const i = new vo(t);
    if (i.push(e, !0), i.err) throw i.msg || Ji[i.err];
    return i.result
}
vo.prototype.push = function (e, t) {
    const i = this.strm,
        r = this.options.chunkSize;
    let o, s;
    if (this.ended) return !1;
    for (s = t === ~~t ? t : !0 === t ? co : ao, "string" == typeof e ? i.input = ro.string2buf(e) : "[object ArrayBuffer]" === so.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;;)
        if (0 === i.avail_out && (i.output = new Uint8Array(r), i.next_out = 0, i.avail_out = r), (s === no || s === lo) && i.avail_out <= 6) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
        else {
            if (o = Jr.deflate(i, s), o === po) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), o = Jr.deflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === ho;
            if (0 !== i.avail_out) {
                if (s > 0 && i.next_out > 0) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
                else if (0 === i.avail_in) break
            } else this.onData(i.output)
        } return !0
}, vo.prototype.onData = function (e) {
    this.chunks.push(e)
}, vo.prototype.onEnd = function (e) {
    e === ho && (this.result = eo.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
};
var yo = {
    Deflate: vo,
    deflate: go,
    deflateRaw: function (e, t) {
        return (t = t || {}).raw = !0, go(e, t)
    },
    gzip: function (e, t) {
        return (t = t || {}).gzip = !0, go(e, t)
    },
    constants: Qi
};
const bo = 16209;
var _o = function (e, t) {
    let i, r, o, s, a, n, l, d, c, h, p, f, u, m, v, g, y, b, _, x, w, E, k, A;
    const S = e.state;
    i = e.next_in, k = e.input, r = i + (e.avail_in - 5), o = e.next_out, A = e.output, s = o - (t - e.avail_out), a = o + (e.avail_out - 257), n = S.dmax, l = S.wsize, d = S.whave, c = S.wnext, h = S.window, p = S.hold, f = S.bits, u = S.lencode, m = S.distcode, v = (1 << S.lenbits) - 1, g = (1 << S.distbits) - 1;
    e: do {
        f < 15 && (p += k[i++] << f, f += 8, p += k[i++] << f, f += 8), y = u[p & v];
        t: for (;;) {
            if (b = y >>> 24, p >>>= b, f -= b, b = y >>> 16 & 255, 0 === b) A[o++] = 65535 & y;
            else {
                if (!(16 & b)) {
                    if (0 == (64 & b)) {
                        y = u[(65535 & y) + (p & (1 << b) - 1)];
                        continue t
                    }
                    if (32 & b) {
                        S.mode = 16191;
                        break e
                    }
                    e.msg = "invalid literal/length code", S.mode = bo;
                    break e
                }
                _ = 65535 & y, b &= 15, b && (f < b && (p += k[i++] << f, f += 8), _ += p & (1 << b) - 1, p >>>= b, f -= b), f < 15 && (p += k[i++] << f, f += 8, p += k[i++] << f, f += 8), y = m[p & g];
                i: for (;;) {
                    if (b = y >>> 24, p >>>= b, f -= b, b = y >>> 16 & 255, !(16 & b)) {
                        if (0 == (64 & b)) {
                            y = m[(65535 & y) + (p & (1 << b) - 1)];
                            continue i
                        }
                        e.msg = "invalid distance code", S.mode = bo;
                        break e
                    }
                    if (x = 65535 & y, b &= 15, f < b && (p += k[i++] << f, f += 8, f < b && (p += k[i++] << f, f += 8)), x += p & (1 << b) - 1, x > n) {
                        e.msg = "invalid distance too far back", S.mode = bo;
                        break e
                    }
                    if (p >>>= b, f -= b, b = o - s, x > b) {
                        if (b = x - b, b > d && S.sane) {
                            e.msg = "invalid distance too far back", S.mode = bo;
                            break e
                        }
                        if (w = 0, E = h, 0 === c) {
                            if (w += l - b, b < _) {
                                _ -= b;
                                do {
                                    A[o++] = h[w++]
                                } while (--b);
                                w = o - x, E = A
                            }
                        } else if (c < b) {
                            if (w += l + c - b, b -= c, b < _) {
                                _ -= b;
                                do {
                                    A[o++] = h[w++]
                                } while (--b);
                                if (w = 0, c < _) {
                                    b = c, _ -= b;
                                    do {
                                        A[o++] = h[w++]
                                    } while (--b);
                                    w = o - x, E = A
                                }
                            }
                        } else if (w += c - b, b < _) {
                            _ -= b;
                            do {
                                A[o++] = h[w++]
                            } while (--b);
                            w = o - x, E = A
                        }
                        for (; _ > 2;) A[o++] = E[w++], A[o++] = E[w++], A[o++] = E[w++], _ -= 3;
                        _ && (A[o++] = E[w++], _ > 1 && (A[o++] = E[w++]))
                    } else {
                        w = o - x;
                        do {
                            A[o++] = A[w++], A[o++] = A[w++], A[o++] = A[w++], _ -= 3
                        } while (_ > 2);
                        _ && (A[o++] = A[w++], _ > 1 && (A[o++] = A[w++]))
                    }
                    break
                }
            }
            break
        }
    } while (i < r && o < a);
    _ = f >> 3, i -= _, f -= _ << 3, p &= (1 << f) - 1, e.next_in = i, e.next_out = o, e.avail_in = i < r ? r - i + 5 : 5 - (i - r), e.avail_out = o < a ? a - o + 257 : 257 - (o - a), S.hold = p, S.bits = f
};
const xo = 15,
    wo = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
    Eo = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
    ko = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
    Ao = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
var So = (e, t, i, r, o, s, a, n) => {
    const l = n.bits;
    let d, c, h, p, f, u, m = 0,
        v = 0,
        g = 0,
        y = 0,
        b = 0,
        _ = 0,
        x = 0,
        w = 0,
        E = 0,
        k = 0,
        A = null;
    const S = new Uint16Array(16),
        R = new Uint16Array(16);
    let T, I, C, B = null;
    for (m = 0; m <= xo; m++) S[m] = 0;
    for (v = 0; v < r; v++) S[t[i + v]]++;
    for (b = l, y = xo; y >= 1 && 0 === S[y]; y--);
    if (b > y && (b = y), 0 === y) return o[s++] = 20971520, o[s++] = 20971520, n.bits = 1, 0;
    for (g = 1; g < y && 0 === S[g]; g++);
    for (b < g && (b = g), w = 1, m = 1; m <= xo; m++)
        if (w <<= 1, w -= S[m], w < 0) return -1;
    if (w > 0 && (0 === e || 1 !== y)) return -1;
    for (R[1] = 0, m = 1; m < xo; m++) R[m + 1] = R[m] + S[m];
    for (v = 0; v < r; v++) 0 !== t[i + v] && (a[R[t[i + v]]++] = v);
    if (0 === e ? (A = B = a, u = 20) : 1 === e ? (A = wo, B = Eo, u = 257) : (A = ko, B = Ao, u = 0), k = 0, v = 0, m = g, f = s, _ = b, x = 0, h = -1, E = 1 << b, p = E - 1, 1 === e && E > 852 || 2 === e && E > 592) return 1;
    for (;;) {
        T = m - x, a[v] + 1 < u ? (I = 0, C = a[v]) : a[v] >= u ? (I = B[a[v] - u], C = A[a[v] - u]) : (I = 96, C = 0), d = 1 << m - x, c = 1 << _, g = c;
        do {
            c -= d, o[f + (k >> x) + c] = T << 24 | I << 16 | C | 0
        } while (0 !== c);
        for (d = 1 << m - 1; k & d;) d >>= 1;
        if (0 !== d ? (k &= d - 1, k += d) : k = 0, v++, 0 == --S[m]) {
            if (m === y) break;
            m = t[i + a[v]]
        }
        if (m > b && (k & p) !== h) {
            for (0 === x && (x = b), f += g, _ = m - x, w = 1 << _; _ + x < y && (w -= S[_ + x], !(w <= 0));) _++, w <<= 1;
            if (E += 1 << _, 1 === e && E > 852 || 2 === e && E > 592) return 1;
            h = k & p, o[h] = b << 24 | _ << 16 | f - s | 0
        }
    }
    return 0 !== k && (o[f + k] = m - x << 24 | 64 << 16 | 0), n.bits = b, 0
};
const {
    Z_FINISH: Ro,
    Z_BLOCK: To,
    Z_TREES: Io,
    Z_OK: Co,
    Z_STREAM_END: Bo,
    Z_NEED_DICT: $o,
    Z_STREAM_ERROR: Lo,
    Z_DATA_ERROR: Oo,
    Z_MEM_ERROR: zo,
    Z_BUF_ERROR: Uo,
    Z_DEFLATED: Do
} = Qi, Po = 16180, Fo = 16190, Mo = 16191, No = 16192, Ho = 16194, qo = 16199, Wo = 16200, Zo = 16206, Vo = 16209, Go = e => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);

function jo() {
    this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
}
const Ko = e => {
        if (!e) return 1;
        const t = e.state;
        return !t || t.strm !== e || t.mode < Po || t.mode > 16211 ? 1 : 0
    },
    Yo = e => {
        if (Ko(e)) return Lo;
        const t = e.state;
        return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = Po, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(852), t.distcode = t.distdyn = new Int32Array(592), t.sane = 1, t.back = -1, Co
    },
    Xo = e => {
        if (Ko(e)) return Lo;
        const t = e.state;
        return t.wsize = 0, t.whave = 0, t.wnext = 0, Yo(e)
    },
    Jo = (e, t) => {
        let i;
        if (Ko(e)) return Lo;
        const r = e.state;
        return t < 0 ? (i = 0, t = -t) : (i = 5 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? Lo : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = i, r.wbits = t, Xo(e))
    },
    Qo = (e, t) => {
        if (!e) return Lo;
        const i = new jo;
        e.state = i, i.strm = e, i.window = null, i.mode = Po;
        const r = Jo(e, t);
        return r !== Co && (e.state = null), r
    };
let es, ts, is = !0;
const rs = e => {
        if (is) {
            es = new Int32Array(512), ts = new Int32Array(32);
            let t = 0;
            for (; t < 144;) e.lens[t++] = 8;
            for (; t < 256;) e.lens[t++] = 9;
            for (; t < 280;) e.lens[t++] = 7;
            for (; t < 288;) e.lens[t++] = 8;
            for (So(1, e.lens, 0, 288, es, 0, e.work, {
                    bits: 9
                }), t = 0; t < 32;) e.lens[t++] = 5;
            So(2, e.lens, 0, 32, ts, 0, e.work, {
                bits: 5
            }), is = !1
        }
        e.lencode = es, e.lenbits = 9, e.distcode = ts, e.distbits = 5
    },
    os = (e, t, i, r) => {
        let o;
        const s = e.state;
        return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new Uint8Array(s.wsize)), r >= s.wsize ? (s.window.set(t.subarray(i - s.wsize, i), 0), s.wnext = 0, s.whave = s.wsize) : (o = s.wsize - s.wnext, o > r && (o = r), s.window.set(t.subarray(i - r, i - r + o), s.wnext), (r -= o) ? (s.window.set(t.subarray(i - r, i), 0), s.wnext = r, s.whave = s.wsize) : (s.wnext += o, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += o))), 0
    };
var ss = (e, t) => {
        let i, r, o, s, a, n, l, d, c, h, p, f, u, m, v, g, y, b, _, x, w, E, k = 0;
        const A = new Uint8Array(4);
        let S, R;
        const T = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
        if (Ko(e) || !e.output || !e.input && 0 !== e.avail_in) return Lo;
        i = e.state, i.mode === Mo && (i.mode = No), a = e.next_out, o = e.output, l = e.avail_out, s = e.next_in, r = e.input, n = e.avail_in, d = i.hold, c = i.bits, h = n, p = l, E = Co;
        e: for (;;) switch (i.mode) {
        case Po:
            if (0 === i.wrap) {
                i.mode = No;
                break
            }
            for (; c < 16;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if (2 & i.wrap && 35615 === d) {
                0 === i.wbits && (i.wbits = 15), i.check = 0, A[0] = 255 & d, A[1] = d >>> 8 & 255, i.check = Xi(i.check, A, 2, 0), d = 0, c = 0, i.mode = 16181;
                break
            }
            if (i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & d) << 8) + (d >> 8)) % 31) {
                e.msg = "incorrect header check", i.mode = Vo;
                break
            }
            if ((15 & d) !== Do) {
                e.msg = "unknown compression method", i.mode = Vo;
                break
            }
            if (d >>>= 4, c -= 4, w = 8 + (15 & d), 0 === i.wbits && (i.wbits = w), w > 15 || w > i.wbits) {
                e.msg = "invalid window size", i.mode = Vo;
                break
            }
            i.dmax = 1 << i.wbits, i.flags = 0, e.adler = i.check = 1, i.mode = 512 & d ? 16189 : Mo, d = 0, c = 0;
            break;
        case 16181:
            for (; c < 16;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if (i.flags = d, (255 & i.flags) !== Do) {
                e.msg = "unknown compression method", i.mode = Vo;
                break
            }
            if (57344 & i.flags) {
                e.msg = "unknown header flags set", i.mode = Vo;
                break
            }
            i.head && (i.head.text = d >> 8 & 1), 512 & i.flags && 4 & i.wrap && (A[0] = 255 & d, A[1] = d >>> 8 & 255, i.check = Xi(i.check, A, 2, 0)), d = 0, c = 0, i.mode = 16182;
        case 16182:
            for (; c < 32;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            i.head && (i.head.time = d), 512 & i.flags && 4 & i.wrap && (A[0] = 255 & d, A[1] = d >>> 8 & 255, A[2] = d >>> 16 & 255, A[3] = d >>> 24 & 255, i.check = Xi(i.check, A, 4, 0)), d = 0, c = 0, i.mode = 16183;
        case 16183:
            for (; c < 16;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            i.head && (i.head.xflags = 255 & d, i.head.os = d >> 8), 512 & i.flags && 4 & i.wrap && (A[0] = 255 & d, A[1] = d >>> 8 & 255, i.check = Xi(i.check, A, 2, 0)), d = 0, c = 0, i.mode = 16184;
        case 16184:
            if (1024 & i.flags) {
                for (; c < 16;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                i.length = d, i.head && (i.head.extra_len = d), 512 & i.flags && 4 & i.wrap && (A[0] = 255 & d, A[1] = d >>> 8 & 255, i.check = Xi(i.check, A, 2, 0)), d = 0, c = 0
            } else i.head && (i.head.extra = null);
            i.mode = 16185;
        case 16185:
            if (1024 & i.flags && (f = i.length, f > n && (f = n), f && (i.head && (w = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Uint8Array(i.head.extra_len)), i.head.extra.set(r.subarray(s, s + f), w)), 512 & i.flags && 4 & i.wrap && (i.check = Xi(i.check, r, f, s)), n -= f, s += f, i.length -= f), i.length)) break e;
            i.length = 0, i.mode = 16186;
        case 16186:
            if (2048 & i.flags) {
                if (0 === n) break e;
                f = 0;
                do {
                    w = r[s + f++], i.head && w && i.length < 65536 && (i.head.name += String.fromCharCode(w))
                } while (w && f < n);
                if (512 & i.flags && 4 & i.wrap && (i.check = Xi(i.check, r, f, s)), n -= f, s += f, w) break e
            } else i.head && (i.head.name = null);
            i.length = 0, i.mode = 16187;
        case 16187:
            if (4096 & i.flags) {
                if (0 === n) break e;
                f = 0;
                do {
                    w = r[s + f++], i.head && w && i.length < 65536 && (i.head.comment += String.fromCharCode(w))
                } while (w && f < n);
                if (512 & i.flags && 4 & i.wrap && (i.check = Xi(i.check, r, f, s)), n -= f, s += f, w) break e
            } else i.head && (i.head.comment = null);
            i.mode = 16188;
        case 16188:
            if (512 & i.flags) {
                for (; c < 16;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                if (4 & i.wrap && d !== (65535 & i.check)) {
                    e.msg = "header crc mismatch", i.mode = Vo;
                    break
                }
                d = 0, c = 0
            }
            i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), e.adler = i.check = 0, i.mode = Mo;
            break;
        case 16189:
            for (; c < 32;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            e.adler = i.check = Go(d), d = 0, c = 0, i.mode = Fo;
        case Fo:
            if (0 === i.havedict) return e.next_out = a, e.avail_out = l, e.next_in = s, e.avail_in = n, i.hold = d, i.bits = c, $o;
            e.adler = i.check = 1, i.mode = Mo;
        case Mo:
            if (t === To || t === Io) break e;
        case No:
            if (i.last) {
                d >>>= 7 & c, c -= 7 & c, i.mode = Zo;
                break
            }
            for (; c < 3;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            switch (i.last = 1 & d, d >>>= 1, c -= 1, 3 & d) {
            case 0:
                i.mode = 16193;
                break;
            case 1:
                if (rs(i), i.mode = qo, t === Io) {
                    d >>>= 2, c -= 2;
                    break e
                }
                break;
            case 2:
                i.mode = 16196;
                break;
            case 3:
                e.msg = "invalid block type", i.mode = Vo
            }
            d >>>= 2, c -= 2;
            break;
        case 16193:
            for (d >>>= 7 & c, c -= 7 & c; c < 32;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if ((65535 & d) != (d >>> 16 ^ 65535)) {
                e.msg = "invalid stored block lengths", i.mode = Vo;
                break
            }
            if (i.length = 65535 & d, d = 0, c = 0, i.mode = Ho, t === Io) break e;
        case Ho:
            i.mode = 16195;
        case 16195:
            if (f = i.length, f) {
                if (f > n && (f = n), f > l && (f = l), 0 === f) break e;
                o.set(r.subarray(s, s + f), a), n -= f, s += f, l -= f, a += f, i.length -= f;
                break
            }
            i.mode = Mo;
            break;
        case 16196:
            for (; c < 14;) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if (i.nlen = 257 + (31 & d), d >>>= 5, c -= 5, i.ndist = 1 + (31 & d), d >>>= 5, c -= 5, i.ncode = 4 + (15 & d), d >>>= 4, c -= 4, i.nlen > 286 || i.ndist > 30) {
                e.msg = "too many length or distance symbols", i.mode = Vo;
                break
            }
            i.have = 0, i.mode = 16197;
        case 16197:
            for (; i.have < i.ncode;) {
                for (; c < 3;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                i.lens[T[i.have++]] = 7 & d, d >>>= 3, c -= 3
            }
            for (; i.have < 19;) i.lens[T[i.have++]] = 0;
            if (i.lencode = i.lendyn, i.lenbits = 7, S = {
                    bits: i.lenbits
                }, E = So(0, i.lens, 0, 19, i.lencode, 0, i.work, S), i.lenbits = S.bits, E) {
                e.msg = "invalid code lengths set", i.mode = Vo;
                break
            }
            i.have = 0, i.mode = 16198;
        case 16198:
            for (; i.have < i.nlen + i.ndist;) {
                for (; k = i.lencode[d & (1 << i.lenbits) - 1], v = k >>> 24, g = k >>> 16 & 255, y = 65535 & k, !(v <= c);) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                if (y < 16) d >>>= v, c -= v, i.lens[i.have++] = y;
                else {
                    if (16 === y) {
                        for (R = v + 2; c < R;) {
                            if (0 === n) break e;
                            n--, d += r[s++] << c, c += 8
                        }
                        if (d >>>= v, c -= v, 0 === i.have) {
                            e.msg = "invalid bit length repeat", i.mode = Vo;
                            break
                        }
                        w = i.lens[i.have - 1], f = 3 + (3 & d), d >>>= 2, c -= 2
                    } else if (17 === y) {
                        for (R = v + 3; c < R;) {
                            if (0 === n) break e;
                            n--, d += r[s++] << c, c += 8
                        }
                        d >>>= v, c -= v, w = 0, f = 3 + (7 & d), d >>>= 3, c -= 3
                    } else {
                        for (R = v + 7; c < R;) {
                            if (0 === n) break e;
                            n--, d += r[s++] << c, c += 8
                        }
                        d >>>= v, c -= v, w = 0, f = 11 + (127 & d), d >>>= 7, c -= 7
                    }
                    if (i.have + f > i.nlen + i.ndist) {
                        e.msg = "invalid bit length repeat", i.mode = Vo;
                        break
                    }
                    for (; f--;) i.lens[i.have++] = w
                }
            }
            if (i.mode === Vo) break;
            if (0 === i.lens[256]) {
                e.msg = "invalid code -- missing end-of-block", i.mode = Vo;
                break
            }
            if (i.lenbits = 9, S = {
                    bits: i.lenbits
                }, E = So(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, S), i.lenbits = S.bits, E) {
                e.msg = "invalid literal/lengths set", i.mode = Vo;
                break
            }
            if (i.distbits = 6, i.distcode = i.distdyn, S = {
                    bits: i.distbits
                }, E = So(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, S), i.distbits = S.bits, E) {
                e.msg = "invalid distances set", i.mode = Vo;
                break
            }
            if (i.mode = qo, t === Io) break e;
        case qo:
            i.mode = Wo;
        case Wo:
            if (n >= 6 && l >= 258) {
                e.next_out = a, e.avail_out = l, e.next_in = s, e.avail_in = n, i.hold = d, i.bits = c, _o(e, p), a = e.next_out, o = e.output, l = e.avail_out, s = e.next_in, r = e.input, n = e.avail_in, d = i.hold, c = i.bits, i.mode === Mo && (i.back = -1);
                break
            }
            for (i.back = 0; k = i.lencode[d & (1 << i.lenbits) - 1], v = k >>> 24, g = k >>> 16 & 255, y = 65535 & k, !(v <= c);) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if (g && 0 == (240 & g)) {
                for (b = v, _ = g, x = y; k = i.lencode[x + ((d & (1 << b + _) - 1) >> b)], v = k >>> 24, g = k >>> 16 & 255, y = 65535 & k, !(b + v <= c);) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                d >>>= b, c -= b, i.back += b
            }
            if (d >>>= v, c -= v, i.back += v, i.length = y, 0 === g) {
                i.mode = 16205;
                break
            }
            if (32 & g) {
                i.back = -1, i.mode = Mo;
                break
            }
            if (64 & g) {
                e.msg = "invalid literal/length code", i.mode = Vo;
                break
            }
            i.extra = 15 & g, i.mode = 16201;
        case 16201:
            if (i.extra) {
                for (R = i.extra; c < R;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                i.length += d & (1 << i.extra) - 1, d >>>= i.extra, c -= i.extra, i.back += i.extra
            }
            i.was = i.length, i.mode = 16202;
        case 16202:
            for (; k = i.distcode[d & (1 << i.distbits) - 1], v = k >>> 24, g = k >>> 16 & 255, y = 65535 & k, !(v <= c);) {
                if (0 === n) break e;
                n--, d += r[s++] << c, c += 8
            }
            if (0 == (240 & g)) {
                for (b = v, _ = g, x = y; k = i.distcode[x + ((d & (1 << b + _) - 1) >> b)], v = k >>> 24, g = k >>> 16 & 255, y = 65535 & k, !(b + v <= c);) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                d >>>= b, c -= b, i.back += b
            }
            if (d >>>= v, c -= v, i.back += v, 64 & g) {
                e.msg = "invalid distance code", i.mode = Vo;
                break
            }
            i.offset = y, i.extra = 15 & g, i.mode = 16203;
        case 16203:
            if (i.extra) {
                for (R = i.extra; c < R;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                i.offset += d & (1 << i.extra) - 1, d >>>= i.extra, c -= i.extra, i.back += i.extra
            }
            if (i.offset > i.dmax) {
                e.msg = "invalid distance too far back", i.mode = Vo;
                break
            }
            i.mode = 16204;
        case 16204:
            if (0 === l) break e;
            if (f = p - l, i.offset > f) {
                if (f = i.offset - f, f > i.whave && i.sane) {
                    e.msg = "invalid distance too far back", i.mode = Vo;
                    break
                }
                f > i.wnext ? (f -= i.wnext, u = i.wsize - f) : u = i.wnext - f, f > i.length && (f = i.length), m = i.window
            } else m = o, u = a - i.offset, f = i.length;
            f > l && (f = l), l -= f, i.length -= f;
            do {
                o[a++] = m[u++]
            } while (--f);
            0 === i.length && (i.mode = Wo);
            break;
        case 16205:
            if (0 === l) break e;
            o[a++] = i.length, l--, i.mode = Wo;
            break;
        case Zo:
            if (i.wrap) {
                for (; c < 32;) {
                    if (0 === n) break e;
                    n--, d |= r[s++] << c, c += 8
                }
                if (p -= l, e.total_out += p, i.total += p, 4 & i.wrap && p && (e.adler = i.check = i.flags ? Xi(i.check, o, p, a - p) : Ki(i.check, o, p, a - p)), p = l, 4 & i.wrap && (i.flags ? d : Go(d)) !== i.check) {
                    e.msg = "incorrect data check", i.mode = Vo;
                    break
                }
                d = 0, c = 0
            }
            i.mode = 16207;
        case 16207:
            if (i.wrap && i.flags) {
                for (; c < 32;) {
                    if (0 === n) break e;
                    n--, d += r[s++] << c, c += 8
                }
                if (4 & i.wrap && d !== (4294967295 & i.total)) {
                    e.msg = "incorrect length check", i.mode = Vo;
                    break
                }
                d = 0, c = 0
            }
            i.mode = 16208;
        case 16208:
            E = Bo;
            break e;
        case Vo:
            E = Oo;
            break e;
        case 16210:
            return zo;
        default:
            return Lo
        }
        return e.next_out = a, e.avail_out = l, e.next_in = s, e.avail_in = n, i.hold = d, i.bits = c, (i.wsize || p !== e.avail_out && i.mode < Vo && (i.mode < Zo || t !== Ro)) && os(e, e.output, e.next_out, p - e.avail_out), h -= e.avail_in, p -= e.avail_out, e.total_in += h, e.total_out += p, i.total += p, 4 & i.wrap && p && (e.adler = i.check = i.flags ? Xi(i.check, o, p, e.next_out - p) : Ki(i.check, o, p, e.next_out - p)), e.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === Mo ? 128 : 0) + (i.mode === qo || i.mode === Ho ? 256 : 0), (0 === h && 0 === p || t === Ro) && E === Co && (E = Uo), E
    },
    as = {
        inflateReset: Xo,
        inflateReset2: Jo,
        inflateResetKeep: Yo,
        inflateInit: e => Qo(e, 15),
        inflateInit2: Qo,
        inflate: ss,
        inflateEnd: e => {
            if (Ko(e)) return Lo;
            let t = e.state;
            return t.window && (t.window = null), e.state = null, Co
        },
        inflateGetHeader: (e, t) => {
            if (Ko(e)) return Lo;
            const i = e.state;
            return 0 == (2 & i.wrap) ? Lo : (i.head = t, t.done = !1, Co)
        },
        inflateSetDictionary: (e, t) => {
            const i = t.length;
            let r, o, s;
            return Ko(e) ? Lo : (r = e.state, 0 !== r.wrap && r.mode !== Fo ? Lo : r.mode === Fo && (o = 1, o = Ki(o, t, i, 0), o !== r.check) ? Oo : (s = os(e, t, i, i), s ? (r.mode = 16210, zo) : (r.havedict = 1, Co)))
        },
        inflateInfo: "pako inflate (from Nodeca project)"
    };
var ns = function () {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
};
const ls = Object.prototype.toString,
    {
        Z_NO_FLUSH: ds,
        Z_FINISH: cs,
        Z_OK: hs,
        Z_STREAM_END: ps,
        Z_NEED_DICT: fs,
        Z_STREAM_ERROR: us,
        Z_DATA_ERROR: ms,
        Z_MEM_ERROR: vs
    } = Qi;

function gs(e) {
    this.options = eo.assign({
        chunkSize: 65536,
        windowBits: 15,
        to: ""
    }, e || {});
    const t = this.options;
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new oo, this.strm.avail_out = 0;
    let i = as.inflateInit2(this.strm, t.windowBits);
    if (i !== hs) throw new Error(Ji[i]);
    if (this.header = new ns, as.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = ro.string2buf(t.dictionary) : "[object ArrayBuffer]" === ls.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (i = as.inflateSetDictionary(this.strm, t.dictionary), i !== hs))) throw new Error(Ji[i])
}

function ys(e, t) {
    const i = new gs(t);
    if (i.push(e), i.err) throw i.msg || Ji[i.err];
    return i.result
}
gs.prototype.push = function (e, t) {
    const i = this.strm,
        r = this.options.chunkSize,
        o = this.options.dictionary;
    let s, a, n;
    if (this.ended) return !1;
    for (a = t === ~~t ? t : !0 === t ? cs : ds, "[object ArrayBuffer]" === ls.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;;) {
        for (0 === i.avail_out && (i.output = new Uint8Array(r), i.next_out = 0, i.avail_out = r), s = as.inflate(i, a), s === fs && o && (s = as.inflateSetDictionary(i, o), s === hs ? s = as.inflate(i, a) : s === ms && (s = fs)); i.avail_in > 0 && s === ps && i.state.wrap > 0 && 0 !== e[i.next_in];) as.inflateReset(i), s = as.inflate(i, a);
        switch (s) {
        case us:
        case ms:
        case fs:
        case vs:
            return this.onEnd(s), this.ended = !0, !1
        }
        if (n = i.avail_out, i.next_out && (0 === i.avail_out || s === ps))
            if ("string" === this.options.to) {
                let e = ro.utf8border(i.output, i.next_out),
                    t = i.next_out - e,
                    o = ro.buf2string(i.output, e);
                i.next_out = t, i.avail_out = r - t, t && i.output.set(i.output.subarray(e, e + t), 0), this.onData(o)
            } else this.onData(i.output.length === i.next_out ? i.output : i.output.subarray(0, i.next_out));
        if (s !== hs || 0 !== n) {
            if (s === ps) return s = as.inflateEnd(this.strm), this.onEnd(s), this.ended = !0, !0;
            if (0 === i.avail_in) break
        }
    }
    return !0
}, gs.prototype.onData = function (e) {
    this.chunks.push(e)
}, gs.prototype.onEnd = function (e) {
    e === hs && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = eo.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
};
var bs = {
    Inflate: gs,
    inflate: ys,
    inflateRaw: function (e, t) {
        return (t = t || {}).raw = !0, ys(e, t)
    },
    ungzip: ys,
    constants: Qi
};
const {
    Deflate: _s,
    deflate: xs,
    deflateRaw: ws,
    gzip: Es
} = yo, {
    Inflate: ks,
    inflate: As,
    inflateRaw: Ss,
    ungzip: Rs
} = bs;
var Ts = xs,
    Is = ks;
class Cs {
    constructor(e, t = !1, i = !0) {
        this.device = e, this.tracing = t, this.slipReaderEnabled = !1, this.leftOver = new Uint8Array(0), this.baudrate = 0, this.traceLog = "", this.lastTraceTime = Date.now(), this._DTR_state = !1, this.slipReaderEnabled = i
    }
    getInfo() {
        const e = this.device.getInfo();
        return e.usbVendorId && e.usbProductId ? `WebSerial VendorID 0x${e.usbVendorId.toString(16)} ProductID 0x${e.usbProductId.toString(16)}` : ""
    }
    getPid() {
        return this.device.getInfo().usbProductId
    }
    trace(e) {
        const t = `${`TRACE ${(Date.now()-this.lastTraceTime).toFixed(3)}`} ${e}`;
        console.log(t), this.traceLog += t + "\n"
    }
    async returnTrace() {
        try {
            await navigator.clipboard.writeText(this.traceLog), console.log("Text copied to clipboard!")
        } catch (e) {
            console.error("Failed to copy text:", e)
        }
    }
    hexify(e) {
        return Array.from(e).map((e => e.toString(16).padStart(2, "0"))).join("").padEnd(16, " ")
    }
    hexConvert(e, t = !0) {
        if (t && e.length > 16) {
            let t = "",
                i = e;
            for (; i.length > 0;) {
                const e = i.slice(0, 16),
                    r = String.fromCharCode(...e).split("").map((e => " " === e || e >= " " && e <= "~" && "  " !== e ? e : ".")).join("");
                i = i.slice(16), t += `\n    ${this.hexify(e.slice(0,8))} ${this.hexify(e.slice(8))} | ${r}`
            }
            return t
        }
        return this.hexify(e)
    }
    slipWriter(e) {
        const t = [];
        t.push(192);
        for (let i = 0; i < e.length; i++) 219 === e[i] ? t.push(219, 221) : 192 === e[i] ? t.push(219, 220) : t.push(e[i]);
        return t.push(192), new Uint8Array(t)
    }
    async write(e) {
        const t = this.slipWriter(e);
        if (this.device.writable) {
            const e = this.device.writable.getWriter();
            this.tracing && (console.log("Write bytes"), this.trace(`Write ${t.length} bytes: ${this.hexConvert(t)}`)), await e.write(t), e.releaseLock()
        }
    }
    _appendBuffer(e, t) {
        const i = new Uint8Array(e.byteLength + t.byteLength);
        return i.set(new Uint8Array(e), 0), i.set(new Uint8Array(t), e.byteLength), i.buffer
    }
    slipReader(e) {
        let t = 0,
            i = 0,
            r = 0,
            o = "init";
        for (; t < e.length;)
            if ("init" !== o || 192 != e[t]) {
                if ("valid_data" === o && 192 == e[t]) {
                    r = t - 1, o = "packet_complete";
                    break
                }
                t++
            } else i = t + 1, o = "valid_data", t++;
        if ("packet_complete" !== o) return this.leftOver = e, new Uint8Array(0);
        this.leftOver = e.slice(r + 2);
        const s = new Uint8Array(r - i + 1);
        let a = 0;
        for (t = i; t <= r; t++, a++) 219 !== e[t] || 220 !== e[t + 1] ? 219 !== e[t] || 221 !== e[t + 1] ? s[a] = e[t] : (s[a] = 219, t++) : (s[a] = 192, t++);
        return s.slice(0, a)
    }
    async read(e = 0, t = 12) {
        let i, r = this.leftOver;
        if (this.leftOver = new Uint8Array(0), this.slipReaderEnabled) {
            const e = this.slipReader(r);
            if (e.length > 0) return e;
            r = this.leftOver, this.leftOver = new Uint8Array(0)
        }
        if (null == this.device.readable) return this.leftOver;
        const o = this.device.readable.getReader();
        try {
            e > 0 && (i = setTimeout((function () {
                o.cancel()
            }), e));
            do {
                const {
                    value: e,
                    done: t
                } = await o.read();
                if (t) throw this.leftOver = r, new Error("Timeout");
                r = new Uint8Array(this._appendBuffer(r.buffer, e.buffer))
            } while (r.length < t)
        } finally {
            e > 0 && clearTimeout(i), o.releaseLock()
        }
        if (this.tracing && (console.log("Read bytes"), this.trace(`Read ${r.length} bytes: ${this.hexConvert(r)}`)), this.slipReaderEnabled) {
            const e = this.slipReader(r);
            return this.tracing && (console.log("Slip reader results"), this.trace(`Read ${e.length} bytes: ${this.hexConvert(e)}`)), e
        }
        return r
    }
    async rawRead(e = 0) {
        if (0 != this.leftOver.length) {
            const e = this.leftOver;
            return this.leftOver = new Uint8Array(0), e
        }
        if (!this.device.readable) return this.leftOver;
        const t = this.device.readable.getReader();
        let i;
        try {
            e > 0 && (i = setTimeout((function () {
                t.cancel()
            }), e));
            const {
                value: r,
                done: o
            } = await t.read();
            if (o) throw new Error("Timeout");
            return this.tracing && (console.log("Raw Read bytes"), this.trace(`Read ${r.length} bytes: ${this.hexConvert(r)}`)), r
        } finally {
            e > 0 && clearTimeout(i), t.releaseLock()
        }
    }
    async setRTS(e) {
        await this.device.setSignals({
            requestToSend: e
        }), await this.setDTR(this._DTR_state)
    }
    async setDTR(e) {
        this._DTR_state = e, await this.device.setSignals({
            dataTerminalReady: e
        })
    }
    async connect(e = 115200, t = {}) {
        await this.device.open({
            baudRate: e,
            dataBits: null == t ? void 0 : t.dataBits,
            stopBits: null == t ? void 0 : t.stopBits,
            bufferSize: null == t ? void 0 : t.bufferSize,
            parity: null == t ? void 0 : t.parity,
            flowControl: null == t ? void 0 : t.flowControl
        }), this.baudrate = e, this.leftOver = new Uint8Array(0)
    }
    async sleep(e) {
        return new Promise((t => setTimeout(t, e)))
    }
    async waitForUnlock(e) {
        for (; this.device.readable && this.device.readable.locked || this.device.writable && this.device.writable.locked;) await this.sleep(e)
    }
    async disconnect() {
        await this.waitForUnlock(400), await this.device.close()
    }
}

function Bs(e) {
    return new Promise((t => setTimeout(t, e)))
}
async function $s(e, t) {
    const i = {
        D: async t => await e.setDTR(t),
        R: async t => await e.setRTS(t),
        W: async e => await Bs(e)
    };
    try {
        const e = function (e) {
            const t = ["D", "R", "W"],
                i = e.split("|");
            for (const e of i) {
                const i = e[0],
                    r = e.slice(1);
                if (!t.includes(i)) return !1;
                if ("D" === i || "R" === i) {
                    if ("0" !== r && "1" !== r) return !1
                } else if ("W" === i) {
                    const e = parseInt(r);
                    if (isNaN(e) || e <= 0) return !1
                }
            }
            return !0
        }(t);
        if (!e) return;
        const r = t.split("|");
        for (const e of r) {
            const t = e[0],
                r = e.slice(1);
            "W" === t ? await i.W(Number(r)) : "D" !== t && "R" !== t || await i[t]("1" === r)
        }
    } catch (e) {
        throw new Error("Invalid custom reset sequence")
    }
}
for (var Ls = {}, Os = {
        byteLength: function (e) {
            var t = Ms(e),
                i = t[0],
                r = t[1];
            return 3 * (i + r) / 4 - r
        },
        toByteArray: function (e) {
            var t, i, r = Ms(e),
                o = r[0],
                s = r[1],
                a = new Ds(function (e, t, i) {
                    return 3 * (t + i) / 4 - i
                }(0, o, s)),
                n = 0,
                l = s > 0 ? o - 4 : o;
            for (i = 0; i < l; i += 4) t = Us[e.charCodeAt(i)] << 18 | Us[e.charCodeAt(i + 1)] << 12 | Us[e.charCodeAt(i + 2)] << 6 | Us[e.charCodeAt(i + 3)], a[n++] = t >> 16 & 255, a[n++] = t >> 8 & 255, a[n++] = 255 & t;
            2 === s && (t = Us[e.charCodeAt(i)] << 2 | Us[e.charCodeAt(i + 1)] >> 4, a[n++] = 255 & t);
            1 === s && (t = Us[e.charCodeAt(i)] << 10 | Us[e.charCodeAt(i + 1)] << 4 | Us[e.charCodeAt(i + 2)] >> 2, a[n++] = t >> 8 & 255, a[n++] = 255 & t);
            return a
        },
        fromByteArray: function (e) {
            for (var t, i = e.length, r = i % 3, o = [], s = 16383, a = 0, n = i - r; a < n; a += s) o.push(Ns(e, a, a + s > n ? n : a + s));
            1 === r ? (t = e[i - 1], o.push(zs[t >> 2] + zs[t << 4 & 63] + "==")) : 2 === r && (t = (e[i - 2] << 8) + e[i - 1], o.push(zs[t >> 10] + zs[t >> 4 & 63] + zs[t << 2 & 63] + "="));
            return o.join("")
        }
    }, zs = [], Us = [], Ds = "undefined" != typeof Uint8Array ? Uint8Array : Array, Ps = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Fs = 0; Fs < 64; ++Fs) zs[Fs] = Ps[Fs], Us[Ps.charCodeAt(Fs)] = Fs;

function Ms(e) {
    var t = e.length;
    if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var i = e.indexOf("=");
    return -1 === i && (i = t), [i, i === t ? 0 : 4 - i % 4]
}

function Ns(e, t, i) {
    for (var r, o, s = [], a = t; a < i; a += 3) r = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(zs[(o = r) >> 18 & 63] + zs[o >> 12 & 63] + zs[o >> 6 & 63] + zs[63 & o]);
    return s.join("")
}
Us["-".charCodeAt(0)] = 62, Us["_".charCodeAt(0)] = 63;
var Hs = {};
Hs.read = function (e, t, i, r, o) {
        var s, a, n = 8 * o - r - 1,
            l = (1 << n) - 1,
            d = l >> 1,
            c = -7,
            h = i ? o - 1 : 0,
            p = i ? -1 : 1,
            f = e[t + h];
        for (h += p, s = f & (1 << -c) - 1, f >>= -c, c += n; c > 0; s = 256 * s + e[t + h], h += p, c -= 8);
        for (a = s & (1 << -c) - 1, s >>= -c, c += r; c > 0; a = 256 * a + e[t + h], h += p, c -= 8);
        if (0 === s) s = 1 - d;
        else {
            if (s === l) return a ? NaN : 1 / 0 * (f ? -1 : 1);
            a += Math.pow(2, r), s -= d
        }
        return (f ? -1 : 1) * a * Math.pow(2, s - r)
    }, Hs.write = function (e, t, i, r, o, s) {
        var a, n, l, d = 8 * s - o - 1,
            c = (1 << d) - 1,
            h = c >> 1,
            p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            f = r ? 0 : s - 1,
            u = r ? 1 : -1,
            m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (n = isNaN(t) ? 1 : 0, a = c) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), (t += a + h >= 1 ? p / l : p * Math.pow(2, 1 - h)) * l >= 2 && (a++, l /= 2), a + h >= c ? (n = 0, a = c) : a + h >= 1 ? (n = (t * l - 1) * Math.pow(2, o), a += h) : (n = t * Math.pow(2, h - 1) * Math.pow(2, o), a = 0)); o >= 8; e[i + f] = 255 & n, f += u, n /= 256, o -= 8);
        for (a = a << o | n, d += o; d > 0; e[i + f] = 255 & a, f += u, a /= 256, d -= 8);
        e[i + f - u] |= 128 * m
    },
    function (e) {
        const t = Os,
            i = Hs,
            r = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
        e.Buffer = a, e.SlowBuffer = function (e) {
            +e != e && (e = 0);
            return a.alloc(+e)
        }, e.INSPECT_MAX_BYTES = 50;
        const o = 2147483647;

        function s(e) {
            if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
            const t = new Uint8Array(e);
            return Object.setPrototypeOf(t, a.prototype), t
        }

        function a(e, t, i) {
            if ("number" == typeof e) {
                if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                return d(e)
            }
            return n(e, t, i)
        }

        function n(e, t, i) {
            if ("string" == typeof e) return function (e, t) {
                "string" == typeof t && "" !== t || (t = "utf8");
                if (!a.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                const i = 0 | f(e, t);
                let r = s(i);
                const o = r.write(e, t);
                o !== i && (r = r.slice(0, o));
                return r
            }(e, t);
            if (ArrayBuffer.isView(e)) return function (e) {
                if (G(e, Uint8Array)) {
                    const t = new Uint8Array(e);
                    return h(t.buffer, t.byteOffset, t.byteLength)
                }
                return c(e)
            }(e);
            if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
            if (G(e, ArrayBuffer) || e && G(e.buffer, ArrayBuffer)) return h(e, t, i);
            if ("undefined" != typeof SharedArrayBuffer && (G(e, SharedArrayBuffer) || e && G(e.buffer, SharedArrayBuffer))) return h(e, t, i);
            if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
            const r = e.valueOf && e.valueOf();
            if (null != r && r !== e) return a.from(r, t, i);
            const o = function (e) {
                if (a.isBuffer(e)) {
                    const t = 0 | p(e.length),
                        i = s(t);
                    return 0 === i.length || e.copy(i, 0, 0, t), i
                }
                if (void 0 !== e.length) return "number" != typeof e.length || j(e.length) ? s(0) : c(e);
                if ("Buffer" === e.type && Array.isArray(e.data)) return c(e.data)
            }(e);
            if (o) return o;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return a.from(e[Symbol.toPrimitive]("string"), t, i);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
        }

        function l(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
            if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
        }

        function d(e) {
            return l(e), s(e < 0 ? 0 : 0 | p(e))
        }

        function c(e) {
            const t = e.length < 0 ? 0 : 0 | p(e.length),
                i = s(t);
            for (let r = 0; r < t; r += 1) i[r] = 255 & e[r];
            return i
        }

        function h(e, t, i) {
            if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
            if (e.byteLength < t + (i || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let r;
            return r = void 0 === t && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e, t) : new Uint8Array(e, t, i), Object.setPrototypeOf(r, a.prototype), r
        }

        function p(e) {
            if (e >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
            return 0 | e
        }

        function f(e, t) {
            if (a.isBuffer(e)) return e.length;
            if (ArrayBuffer.isView(e) || G(e, ArrayBuffer)) return e.byteLength;
            if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
            const i = e.length,
                r = arguments.length > 2 && !0 === arguments[2];
            if (!r && 0 === i) return 0;
            let o = !1;
            for (;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return i;
            case "utf8":
            case "utf-8":
                return W(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * i;
            case "hex":
                return i >>> 1;
            case "base64":
                return Z(e).length;
            default:
                if (o) return r ? -1 : W(e).length;
                t = ("" + t).toLowerCase(), o = !0
            }
        }

        function u(e, t, i) {
            let r = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
            if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
            if ((i >>>= 0) <= (t >>>= 0)) return "";
            for (e || (e = "utf8");;) switch (e) {
            case "hex":
                return T(this, t, i);
            case "utf8":
            case "utf-8":
                return k(this, t, i);
            case "ascii":
                return S(this, t, i);
            case "latin1":
            case "binary":
                return R(this, t, i);
            case "base64":
                return E(this, t, i);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return I(this, t, i);
            default:
                if (r) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), r = !0
            }
        }

        function m(e, t, i) {
            const r = e[t];
            e[t] = e[i], e[i] = r
        }

        function v(e, t, i, r, o) {
            if (0 === e.length) return -1;
            if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), j(i = +i) && (i = o ? 0 : e.length - 1), i < 0 && (i = e.length + i), i >= e.length) {
                if (o) return -1;
                i = e.length - 1
            } else if (i < 0) {
                if (!o) return -1;
                i = 0
            }
            if ("string" == typeof t && (t = a.from(t, r)), a.isBuffer(t)) return 0 === t.length ? -1 : g(e, t, i, r, o);
            if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : g(e, [t], i, r, o);
            throw new TypeError("val must be string, number or Buffer")
        }

        function g(e, t, i, r, o) {
            let s, a = 1,
                n = e.length,
                l = t.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2) return -1;
                a = 2, n /= 2, l /= 2, i /= 2
            }

            function d(e, t) {
                return 1 === a ? e[t] : e.readUInt16BE(t * a)
            }
            if (o) {
                let r = -1;
                for (s = i; s < n; s++)
                    if (d(e, s) === d(t, -1 === r ? 0 : s - r)) {
                        if (-1 === r && (r = s), s - r + 1 === l) return r * a
                    } else -1 !== r && (s -= s - r), r = -1
            } else
                for (i + l > n && (i = n - l), s = i; s >= 0; s--) {
                    let i = !0;
                    for (let r = 0; r < l; r++)
                        if (d(e, s + r) !== d(t, r)) {
                            i = !1;
                            break
                        } if (i) return s
                }
            return -1
        }

        function y(e, t, i, r) {
            i = Number(i) || 0;
            const o = e.length - i;
            r ? (r = Number(r)) > o && (r = o) : r = o;
            const s = t.length;
            let a;
            for (r > s / 2 && (r = s / 2), a = 0; a < r; ++a) {
                const r = parseInt(t.substr(2 * a, 2), 16);
                if (j(r)) return a;
                e[i + a] = r
            }
            return a
        }

        function b(e, t, i, r) {
            return V(W(t, e.length - i), e, i, r)
        }

        function _(e, t, i, r) {
            return V(function (e) {
                const t = [];
                for (let i = 0; i < e.length; ++i) t.push(255 & e.charCodeAt(i));
                return t
            }(t), e, i, r)
        }

        function x(e, t, i, r) {
            return V(Z(t), e, i, r)
        }

        function w(e, t, i, r) {
            return V(function (e, t) {
                let i, r, o;
                const s = [];
                for (let a = 0; a < e.length && !((t -= 2) < 0); ++a) i = e.charCodeAt(a), r = i >> 8, o = i % 256, s.push(o), s.push(r);
                return s
            }(t, e.length - i), e, i, r)
        }

        function E(e, i, r) {
            return 0 === i && r === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(i, r))
        }

        function k(e, t, i) {
            i = Math.min(e.length, i);
            const r = [];
            let o = t;
            for (; o < i;) {
                const t = e[o];
                let s = null,
                    a = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                if (o + a <= i) {
                    let i, r, n, l;
                    switch (a) {
                    case 1:
                        t < 128 && (s = t);
                        break;
                    case 2:
                        i = e[o + 1], 128 == (192 & i) && (l = (31 & t) << 6 | 63 & i, l > 127 && (s = l));
                        break;
                    case 3:
                        i = e[o + 1], r = e[o + 2], 128 == (192 & i) && 128 == (192 & r) && (l = (15 & t) << 12 | (63 & i) << 6 | 63 & r, l > 2047 && (l < 55296 || l > 57343) && (s = l));
                        break;
                    case 4:
                        i = e[o + 1], r = e[o + 2], n = e[o + 3], 128 == (192 & i) && 128 == (192 & r) && 128 == (192 & n) && (l = (15 & t) << 18 | (63 & i) << 12 | (63 & r) << 6 | 63 & n, l > 65535 && l < 1114112 && (s = l))
                    }
                }
                null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), r.push(s), o += a
            }
            return function (e) {
                const t = e.length;
                if (t <= A) return String.fromCharCode.apply(String, e);
                let i = "",
                    r = 0;
                for (; r < t;) i += String.fromCharCode.apply(String, e.slice(r, r += A));
                return i
            }(r)
        }
        e.kMaxLength = o, a.TYPED_ARRAY_SUPPORT = function () {
            try {
                const e = new Uint8Array(1),
                    t = {
                        foo: function () {
                            return 42
                        }
                    };
                return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), 42 === e.foo()
            } catch (e) {
                return !1
            }
        }(), a.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(a.prototype, "parent", {
            enumerable: !0,
            get: function () {
                if (a.isBuffer(this)) return this.buffer
            }
        }), Object.defineProperty(a.prototype, "offset", {
            enumerable: !0,
            get: function () {
                if (a.isBuffer(this)) return this.byteOffset
            }
        }), a.poolSize = 8192, a.from = function (e, t, i) {
            return n(e, t, i)
        }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array), a.alloc = function (e, t, i) {
            return function (e, t, i) {
                return l(e), e <= 0 ? s(e) : void 0 !== t ? "string" == typeof i ? s(e).fill(t, i) : s(e).fill(t) : s(e)
            }(e, t, i)
        }, a.allocUnsafe = function (e) {
            return d(e)
        }, a.allocUnsafeSlow = function (e) {
            return d(e)
        }, a.isBuffer = function (e) {
            return null != e && !0 === e._isBuffer && e !== a.prototype
        }, a.compare = function (e, t) {
            if (G(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), G(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(e) || !a.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e === t) return 0;
            let i = e.length,
                r = t.length;
            for (let o = 0, s = Math.min(i, r); o < s; ++o)
                if (e[o] !== t[o]) {
                    i = e[o], r = t[o];
                    break
                } return i < r ? -1 : r < i ? 1 : 0
        }, a.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }, a.concat = function (e, t) {
            if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return a.alloc(0);
            let i;
            if (void 0 === t)
                for (t = 0, i = 0; i < e.length; ++i) t += e[i].length;
            const r = a.allocUnsafe(t);
            let o = 0;
            for (i = 0; i < e.length; ++i) {
                let t = e[i];
                if (G(t, Uint8Array)) o + t.length > r.length ? (a.isBuffer(t) || (t = a.from(t)), t.copy(r, o)) : Uint8Array.prototype.set.call(r, t, o);
                else {
                    if (!a.isBuffer(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    t.copy(r, o)
                }
                o += t.length
            }
            return r
        }, a.byteLength = f, a.prototype._isBuffer = !0, a.prototype.swap16 = function () {
            const e = this.length;
            if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t = 0; t < e; t += 2) m(this, t, t + 1);
            return this
        }, a.prototype.swap32 = function () {
            const e = this.length;
            if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
            return this
        }, a.prototype.swap64 = function () {
            const e = this.length;
            if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t = 0; t < e; t += 8) m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4);
            return this
        }, a.prototype.toString = function () {
            const e = this.length;
            return 0 === e ? "" : 0 === arguments.length ? k(this, 0, e) : u.apply(this, arguments)
        }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function (e) {
            if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === a.compare(this, e)
        }, a.prototype.inspect = function () {
            let t = "";
            const i = e.INSPECT_MAX_BYTES;
            return t = this.toString("hex", 0, i).replace(/(.{2})/g, "$1 ").trim(), this.length > i && (t += " ... "), "<Buffer " + t + ">"
        }, r && (a.prototype[r] = a.prototype.inspect), a.prototype.compare = function (e, t, i, r, o) {
            if (G(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (void 0 === t && (t = 0), void 0 === i && (i = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || i > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");
            if (r >= o && t >= i) return 0;
            if (r >= o) return -1;
            if (t >= i) return 1;
            if (this === e) return 0;
            let s = (o >>>= 0) - (r >>>= 0),
                n = (i >>>= 0) - (t >>>= 0);
            const l = Math.min(s, n),
                d = this.slice(r, o),
                c = e.slice(t, i);
            for (let e = 0; e < l; ++e)
                if (d[e] !== c[e]) {
                    s = d[e], n = c[e];
                    break
                } return s < n ? -1 : n < s ? 1 : 0
        }, a.prototype.includes = function (e, t, i) {
            return -1 !== this.indexOf(e, t, i)
        }, a.prototype.indexOf = function (e, t, i) {
            return v(this, e, t, i, !0)
        }, a.prototype.lastIndexOf = function (e, t, i) {
            return v(this, e, t, i, !1)
        }, a.prototype.write = function (e, t, i, r) {
            if (void 0 === t) r = "utf8", i = this.length, t = 0;
            else if (void 0 === i && "string" == typeof t) r = t, i = this.length, t = 0;
            else {
                if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t >>>= 0, isFinite(i) ? (i >>>= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
            }
            const o = this.length - t;
            if ((void 0 === i || i > o) && (i = o), e.length > 0 && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            let s = !1;
            for (;;) switch (r) {
            case "hex":
                return y(this, e, t, i);
            case "utf8":
            case "utf-8":
                return b(this, e, t, i);
            case "ascii":
            case "latin1":
            case "binary":
                return _(this, e, t, i);
            case "base64":
                return x(this, e, t, i);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return w(this, e, t, i);
            default:
                if (s) throw new TypeError("Unknown encoding: " + r);
                r = ("" + r).toLowerCase(), s = !0
            }
        }, a.prototype.toJSON = function () {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        const A = 4096;

        function S(e, t, i) {
            let r = "";
            i = Math.min(e.length, i);
            for (let o = t; o < i; ++o) r += String.fromCharCode(127 & e[o]);
            return r
        }

        function R(e, t, i) {
            let r = "";
            i = Math.min(e.length, i);
            for (let o = t; o < i; ++o) r += String.fromCharCode(e[o]);
            return r
        }

        function T(e, t, i) {
            const r = e.length;
            (!t || t < 0) && (t = 0), (!i || i < 0 || i > r) && (i = r);
            let o = "";
            for (let r = t; r < i; ++r) o += K[e[r]];
            return o
        }

        function I(e, t, i) {
            const r = e.slice(t, i);
            let o = "";
            for (let e = 0; e < r.length - 1; e += 2) o += String.fromCharCode(r[e] + 256 * r[e + 1]);
            return o
        }

        function C(e, t, i) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > i) throw new RangeError("Trying to access beyond buffer length")
        }

        function B(e, t, i, r, o, s) {
            if (!a.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > o || t < s) throw new RangeError('"value" argument is out of bounds');
            if (i + r > e.length) throw new RangeError("Index out of range")
        }

        function $(e, t, i, r, o) {
            M(t, r, o, e, i, 7);
            let s = Number(t & BigInt(4294967295));
            e[i++] = s, s >>= 8, e[i++] = s, s >>= 8, e[i++] = s, s >>= 8, e[i++] = s;
            let a = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[i++] = a, a >>= 8, e[i++] = a, a >>= 8, e[i++] = a, a >>= 8, e[i++] = a, i
        }

        function L(e, t, i, r, o) {
            M(t, r, o, e, i, 7);
            let s = Number(t & BigInt(4294967295));
            e[i + 7] = s, s >>= 8, e[i + 6] = s, s >>= 8, e[i + 5] = s, s >>= 8, e[i + 4] = s;
            let a = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[i + 3] = a, a >>= 8, e[i + 2] = a, a >>= 8, e[i + 1] = a, a >>= 8, e[i] = a, i + 8
        }

        function O(e, t, i, r, o, s) {
            if (i + r > e.length) throw new RangeError("Index out of range");
            if (i < 0) throw new RangeError("Index out of range")
        }

        function z(e, t, r, o, s) {
            return t = +t, r >>>= 0, s || O(e, 0, r, 4), i.write(e, t, r, o, 23, 4), r + 4
        }

        function U(e, t, r, o, s) {
            return t = +t, r >>>= 0, s || O(e, 0, r, 8), i.write(e, t, r, o, 52, 8), r + 8
        }
        a.prototype.slice = function (e, t) {
            const i = this.length;
            (e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), t < e && (t = e);
            const r = this.subarray(e, t);
            return Object.setPrototypeOf(r, a.prototype), r
        }, a.prototype.readUintLE = a.prototype.readUIntLE = function (e, t, i) {
            e >>>= 0, t >>>= 0, i || C(e, t, this.length);
            let r = this[e],
                o = 1,
                s = 0;
            for (; ++s < t && (o *= 256);) r += this[e + s] * o;
            return r
        }, a.prototype.readUintBE = a.prototype.readUIntBE = function (e, t, i) {
            e >>>= 0, t >>>= 0, i || C(e, t, this.length);
            let r = this[e + --t],
                o = 1;
            for (; t > 0 && (o *= 256);) r += this[e + --t] * o;
            return r
        }, a.prototype.readUint8 = a.prototype.readUInt8 = function (e, t) {
            return e >>>= 0, t || C(e, 1, this.length), this[e]
        }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function (e, t) {
            return e >>>= 0, t || C(e, 2, this.length), this[e] | this[e + 1] << 8
        }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function (e, t) {
            return e >>>= 0, t || C(e, 2, this.length), this[e] << 8 | this[e + 1]
        }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }, a.prototype.readBigUInt64LE = Y((function (e) {
            N(e >>>= 0, "offset");
            const t = this[e],
                i = this[e + 7];
            void 0 !== t && void 0 !== i || H(e, this.length - 8);
            const r = t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24,
                o = this[++e] + 256 * this[++e] + 65536 * this[++e] + i * 2 ** 24;
            return BigInt(r) + (BigInt(o) << BigInt(32))
        })), a.prototype.readBigUInt64BE = Y((function (e) {
            N(e >>>= 0, "offset");
            const t = this[e],
                i = this[e + 7];
            void 0 !== t && void 0 !== i || H(e, this.length - 8);
            const r = t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e],
                o = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + i;
            return (BigInt(r) << BigInt(32)) + BigInt(o)
        })), a.prototype.readIntLE = function (e, t, i) {
            e >>>= 0, t >>>= 0, i || C(e, t, this.length);
            let r = this[e],
                o = 1,
                s = 0;
            for (; ++s < t && (o *= 256);) r += this[e + s] * o;
            return o *= 128, r >= o && (r -= Math.pow(2, 8 * t)), r
        }, a.prototype.readIntBE = function (e, t, i) {
            e >>>= 0, t >>>= 0, i || C(e, t, this.length);
            let r = t,
                o = 1,
                s = this[e + --r];
            for (; r > 0 && (o *= 256);) s += this[e + --r] * o;
            return o *= 128, s >= o && (s -= Math.pow(2, 8 * t)), s
        }, a.prototype.readInt8 = function (e, t) {
            return e >>>= 0, t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }, a.prototype.readInt16LE = function (e, t) {
            e >>>= 0, t || C(e, 2, this.length);
            const i = this[e] | this[e + 1] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, a.prototype.readInt16BE = function (e, t) {
            e >>>= 0, t || C(e, 2, this.length);
            const i = this[e + 1] | this[e] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, a.prototype.readInt32LE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }, a.prototype.readInt32BE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }, a.prototype.readBigInt64LE = Y((function (e) {
            N(e >>>= 0, "offset");
            const t = this[e],
                i = this[e + 7];
            void 0 !== t && void 0 !== i || H(e, this.length - 8);
            const r = this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (i << 24);
            return (BigInt(r) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
        })), a.prototype.readBigInt64BE = Y((function (e) {
            N(e >>>= 0, "offset");
            const t = this[e],
                i = this[e + 7];
            void 0 !== t && void 0 !== i || H(e, this.length - 8);
            const r = (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
            return (BigInt(r) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + i)
        })), a.prototype.readFloatLE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), i.read(this, e, !0, 23, 4)
        }, a.prototype.readFloatBE = function (e, t) {
            return e >>>= 0, t || C(e, 4, this.length), i.read(this, e, !1, 23, 4)
        }, a.prototype.readDoubleLE = function (e, t) {
            return e >>>= 0, t || C(e, 8, this.length), i.read(this, e, !0, 52, 8)
        }, a.prototype.readDoubleBE = function (e, t) {
            return e >>>= 0, t || C(e, 8, this.length), i.read(this, e, !1, 52, 8)
        }, a.prototype.writeUintLE = a.prototype.writeUIntLE = function (e, t, i, r) {
            if (e = +e, t >>>= 0, i >>>= 0, !r) {
                B(this, e, t, i, Math.pow(2, 8 * i) - 1, 0)
            }
            let o = 1,
                s = 0;
            for (this[t] = 255 & e; ++s < i && (o *= 256);) this[t + s] = e / o & 255;
            return t + i
        }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function (e, t, i, r) {
            if (e = +e, t >>>= 0, i >>>= 0, !r) {
                B(this, e, t, i, Math.pow(2, 8 * i) - 1, 0)
            }
            let o = i - 1,
                s = 1;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) this[t + o] = e / s & 255;
            return t + i
        }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
        }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
        }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
        }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
        }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
        }, a.prototype.writeBigUInt64LE = Y((function (e, t = 0) {
            return $(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        })), a.prototype.writeBigUInt64BE = Y((function (e, t = 0) {
            return L(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        })), a.prototype.writeIntLE = function (e, t, i, r) {
            if (e = +e, t >>>= 0, !r) {
                const r = Math.pow(2, 8 * i - 1);
                B(this, e, t, i, r - 1, -r)
            }
            let o = 0,
                s = 1,
                a = 0;
            for (this[t] = 255 & e; ++o < i && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
            return t + i
        }, a.prototype.writeIntBE = function (e, t, i, r) {
            if (e = +e, t >>>= 0, !r) {
                const r = Math.pow(2, 8 * i - 1);
                B(this, e, t, i, r - 1, -r)
            }
            let o = i - 1,
                s = 1,
                a = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
            return t + i
        }, a.prototype.writeInt8 = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
        }, a.prototype.writeInt16LE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
        }, a.prototype.writeInt16BE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
        }, a.prototype.writeInt32LE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
        }, a.prototype.writeInt32BE = function (e, t, i) {
            return e = +e, t >>>= 0, i || B(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
        }, a.prototype.writeBigInt64LE = Y((function (e, t = 0) {
            return $(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        })), a.prototype.writeBigInt64BE = Y((function (e, t = 0) {
            return L(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        })), a.prototype.writeFloatLE = function (e, t, i) {
            return z(this, e, t, !0, i)
        }, a.prototype.writeFloatBE = function (e, t, i) {
            return z(this, e, t, !1, i)
        }, a.prototype.writeDoubleLE = function (e, t, i) {
            return U(this, e, t, !0, i)
        }, a.prototype.writeDoubleBE = function (e, t, i) {
            return U(this, e, t, !1, i)
        }, a.prototype.copy = function (e, t, i, r) {
            if (!a.isBuffer(e)) throw new TypeError("argument should be a Buffer");
            if (i || (i = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < i && (r = i), r === i) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (i < 0 || i >= this.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), e.length - t < r - i && (r = e.length - t + i);
            const o = r - i;
            return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, i, r) : Uint8Array.prototype.set.call(e, this.subarray(i, r), t), o
        }, a.prototype.fill = function (e, t, i, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t, t = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !a.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                if (1 === e.length) {
                    const t = e.charCodeAt(0);
                    ("utf8" === r && t < 128 || "latin1" === r) && (e = t)
                }
            } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
            if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
            if (i <= t) return this;
            let o;
            if (t >>>= 0, i = void 0 === i ? this.length : i >>> 0, e || (e = 0), "number" == typeof e)
                for (o = t; o < i; ++o) this[o] = e;
            else {
                const s = a.isBuffer(e) ? e : a.from(e, r),
                    n = s.length;
                if (0 === n) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (o = 0; o < i - t; ++o) this[o + t] = s[o % n]
            }
            return this
        };
        const D = {};

        function P(e, t, i) {
            D[e] = class extends i {
                constructor() {
                    super(), Object.defineProperty(this, "message", {
                        value: t.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }), this.name = `${this.name} [${e}]`, this.stack, delete this.name
                }
                get code() {
                    return e
                }
                set code(e) {
                    Object.defineProperty(this, "code", {
                        configurable: !0,
                        enumerable: !0,
                        value: e,
                        writable: !0
                    })
                }
                toString() {
                    return `${this.name} [${e}]: ${this.message}`
                }
            }
        }

        function F(e) {
            let t = "",
                i = e.length;
            const r = "-" === e[0] ? 1 : 0;
            for (; i >= r + 4; i -= 3) t = `_${e.slice(i-3,i)}${t}`;
            return `${e.slice(0,i)}${t}`
        }

        function M(e, t, i, r, o, s) {
            if (e > i || e < t) {
                const r = "bigint" == typeof t ? "n" : "";
                let o;
                throw o = s > 3 ? 0 === t || t === BigInt(0) ? `>= 0${r} and < 2${r} ** ${8*(s+1)}${r}` : `>= -(2${r} ** ${8*(s+1)-1}${r}) and < 2 ** ${8*(s+1)-1}${r}` : `>= ${t}${r} and <= ${i}${r}`, new D.ERR_OUT_OF_RANGE("value", o, e)
            }! function (e, t, i) {
                N(t, "offset"), void 0 !== e[t] && void 0 !== e[t + i] || H(t, e.length - (i + 1))
            }(r, o, s)
        }

        function N(e, t) {
            if ("number" != typeof e) throw new D.ERR_INVALID_ARG_TYPE(t, "number", e)
        }

        function H(e, t, i) {
            if (Math.floor(e) !== e) throw N(e, i), new D.ERR_OUT_OF_RANGE(i || "offset", "an integer", e);
            if (t < 0) throw new D.ERR_BUFFER_OUT_OF_BOUNDS;
            throw new D.ERR_OUT_OF_RANGE(i || "offset", `>= ${i?1:0} and <= ${t}`, e)
        }
        P("ERR_BUFFER_OUT_OF_BOUNDS", (function (e) {
            return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
        }), RangeError), P("ERR_INVALID_ARG_TYPE", (function (e, t) {
            return `The "${e}" argument must be of type number. Received type ${typeof t}`
        }), TypeError), P("ERR_OUT_OF_RANGE", (function (e, t, i) {
            let r = `The value of "${e}" is out of range.`,
                o = i;
            return Number.isInteger(i) && Math.abs(i) > 2 ** 32 ? o = F(String(i)) : "bigint" == typeof i && (o = String(i), (i > BigInt(2) ** BigInt(32) || i < -(BigInt(2) ** BigInt(32))) && (o = F(o)), o += "n"), r += ` It must be ${t}. Received ${o}`, r
        }), RangeError);
        const q = /[^+/0-9A-Za-z-_]/g;

        function W(e, t) {
            let i;
            t = t || 1 / 0;
            const r = e.length;
            let o = null;
            const s = [];
            for (let a = 0; a < r; ++a) {
                if (i = e.charCodeAt(a), i > 55295 && i < 57344) {
                    if (!o) {
                        if (i > 56319) {
                            (t -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (t -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        o = i;
                        continue
                    }
                    if (i < 56320) {
                        (t -= 3) > -1 && s.push(239, 191, 189), o = i;
                        continue
                    }
                    i = 65536 + (o - 55296 << 10 | i - 56320)
                } else o && (t -= 3) > -1 && s.push(239, 191, 189);
                if (o = null, i < 128) {
                    if ((t -= 1) < 0) break;
                    s.push(i)
                } else if (i < 2048) {
                    if ((t -= 2) < 0) break;
                    s.push(i >> 6 | 192, 63 & i | 128)
                } else if (i < 65536) {
                    if ((t -= 3) < 0) break;
                    s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                } else {
                    if (!(i < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                }
            }
            return s
        }

        function Z(e) {
            return t.toByteArray(function (e) {
                if ((e = (e = e.split("=")[0]).trim().replace(q, "")).length < 2) return "";
                for (; e.length % 4 != 0;) e += "=";
                return e
            }(e))
        }

        function V(e, t, i, r) {
            let o;
            for (o = 0; o < r && !(o + i >= t.length || o >= e.length); ++o) t[o + i] = e[o];
            return o
        }

        function G(e, t) {
            return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
        }

        function j(e) {
            return e != e
        }
        const K = function () {
            const e = "0123456789abcdef",
                t = new Array(256);
            for (let i = 0; i < 16; ++i) {
                const r = 16 * i;
                for (let o = 0; o < 16; ++o) t[r + o] = e[i] + e[o]
            }
            return t
        }();

        function Y(e) {
            return "undefined" == typeof BigInt ? X : e
        }

        function X() {
            throw new Error("BigInt not supported")
        }
    }(Ls);
class qs {
    constructor(e) {
        this.ESP_RAM_BLOCK = 6144, this.ESP_FLASH_BEGIN = 2, this.ESP_FLASH_DATA = 3, this.ESP_FLASH_END = 4, this.ESP_MEM_BEGIN = 5, this.ESP_MEM_END = 6, this.ESP_MEM_DATA = 7, this.ESP_WRITE_REG = 9, this.ESP_READ_REG = 10, this.ESP_SPI_ATTACH = 13, this.ESP_CHANGE_BAUDRATE = 15, this.ESP_FLASH_DEFL_BEGIN = 16, this.ESP_FLASH_DEFL_DATA = 17, this.ESP_FLASH_DEFL_END = 18, this.ESP_SPI_FLASH_MD5 = 19, this.ESP_ERASE_FLASH = 208, this.ESP_ERASE_REGION = 209, this.ESP_READ_FLASH = 210, this.ESP_RUN_USER_CODE = 211, this.ESP_IMAGE_MAGIC = 233, this.ESP_CHECKSUM_MAGIC = 239, this.ROM_INVALID_RECV_MSG = 5, this.ERASE_REGION_TIMEOUT_PER_MB = 3e4, this.ERASE_WRITE_TIMEOUT_PER_MB = 4e4, this.MD5_TIMEOUT_PER_MB = 8e3, this.CHIP_ERASE_TIMEOUT = 12e4, this.FLASH_READ_TIMEOUT = 1e5, this.MAX_TIMEOUT = 2 * this.CHIP_ERASE_TIMEOUT, this.CHIP_DETECT_MAGIC_REG_ADDR = 1073745920, this.DETECTED_FLASH_SIZES = {
            18: "256KB",
            19: "512KB",
            20: "1MB",
            21: "2MB",
            22: "4MB",
            23: "8MB",
            24: "16MB"
        }, this.DETECTED_FLASH_SIZES_NUM = {
            18: 256,
            19: 512,
            20: 1024,
            21: 2048,
            22: 4096,
            23: 8192,
            24: 16384
        }, this.USB_JTAG_SERIAL_PID = 4097, this.romBaudrate = 115200, this.debugLogging = !1, this.checksum = function (e) {
            let t, i = 239;
            for (t = 0; t < e.length; t++) i ^= e[t];
            return i
        }, this.timeoutPerMb = function (e, t) {
            const i = e * (t / 1e6);
            return i < 3e3 ? 3e3 : i
        }, this.flashSizeBytes = function (e) {
            let t = -1;
            return -1 !== e.indexOf("KB") ? t = 1024 * parseInt(e.slice(0, e.indexOf("KB"))) : -1 !== e.indexOf("MB") && (t = 1024 * parseInt(e.slice(0, e.indexOf("MB"))) * 1024), t
        }, this.IS_STUB = !1, this.FLASH_WRITE_SIZE = 16384, this.transport = e.transport, this.baudrate = e.baudrate, e.serialOptions && (this.serialOptions = e.serialOptions), e.romBaudrate && (this.romBaudrate = e.romBaudrate), e.terminal && (this.terminal = e.terminal, this.terminal.clean()), void 0 !== e.debugLogging && (this.debugLogging = e.debugLogging), e.port && (this.transport = new Cs(e.port)), void 0 !== e.enableTracing && (this.transport.tracing = e.enableTracing), this.info("esptool.js"), this.info("Serial port " + this.transport.getInfo())
    }
    _sleep(e) {
        return new Promise((t => setTimeout(t, e)))
    }
    write(e, t = !0) {
        this.terminal ? t ? this.terminal.writeLine(e) : this.terminal.write(e) : console.log(e)
    }
    error(e, t = !0) {
        this.write(`Error: ${e}`, t)
    }
    info(e, t = !0) {
        this.write(e, t)
    }
    debug(e, t = !0) {
        this.debugLogging && this.write(`Debug: ${e}`, t)
    }
    _shortToBytearray(e) {
        return new Uint8Array([255 & e, e >> 8 & 255])
    }
    _intToByteArray(e) {
        return new Uint8Array([255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255])
    }
    _byteArrayToShort(e, t) {
        return e | t >> 8
    }
    _byteArrayToInt(e, t, i, r) {
        return e | t << 8 | i << 16 | r << 24
    }
    _appendBuffer(e, t) {
        const i = new Uint8Array(e.byteLength + t.byteLength);
        return i.set(new Uint8Array(e), 0), i.set(new Uint8Array(t), e.byteLength), i.buffer
    }
    _appendArray(e, t) {
        const i = new Uint8Array(e.length + t.length);
        return i.set(e, 0), i.set(t, e.length), i
    }
    ui8ToBstr(e) {
        let t = "";
        for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
        return t
    }
    bstrToUi8(e) {
        const t = new Uint8Array(e.length);
        for (let i = 0; i < e.length; i++) t[i] = e.charCodeAt(i);
        return t
    }
    async flushInput() {
        try {
            await this.transport.rawRead(200)
        } catch (e) {
            this.error(e.message)
        }
    }
    async readPacket(e = null, t = 3e3) {
        for (let i = 0; i < 100; i++) {
            const i = await this.transport.read(t),
                r = i[0],
                o = i[1],
                s = this._byteArrayToInt(i[4], i[5], i[6], i[7]),
                a = i.slice(8);
            if (1 == r) {
                if (null == e || o == e) return [s, a];
                if (0 != a[0] && a[1] == this.ROM_INVALID_RECV_MSG) throw await this.flushInput(), new ni("unsupported command error")
            }
        }
        throw new ni("invalid response")
    }
    async command(e = null, t = new Uint8Array(0), i = 0, r = !0, o = 3e3) {
        if (null != e) {
            this.transport.tracing && this.transport.trace(`command op:0x${e.toString(16).padStart(2,"0")} data len=${t.length} wait_response=${r?1:0} timeout=${(o/1e3).toFixed(3)} data=${this.transport.hexConvert(t)}`);
            const s = new Uint8Array(8 + t.length);
            let a;
            for (s[0] = 0, s[1] = e, s[2] = this._shortToBytearray(t.length)[0], s[3] = this._shortToBytearray(t.length)[1], s[4] = this._intToByteArray(i)[0], s[5] = this._intToByteArray(i)[1], s[6] = this._intToByteArray(i)[2], s[7] = this._intToByteArray(i)[3], a = 0; a < t.length; a++) s[8 + a] = t[a];
            await this.transport.write(s)
        }
        return r ? this.readPacket(e, o) : [0, new Uint8Array(0)]
    }
    async readReg(e, t = 3e3) {
        const i = this._intToByteArray(e);
        return (await this.command(this.ESP_READ_REG, i, void 0, void 0, t))[0]
    }
    async writeReg(e, t, i = 4294967295, r = 0, o = 0) {
        let s = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
        s = this._appendArray(s, this._intToByteArray(i)), s = this._appendArray(s, this._intToByteArray(r)), o > 0 && (s = this._appendArray(s, this._intToByteArray(this.chip.UART_DATE_REG_ADDR)), s = this._appendArray(s, this._intToByteArray(0)), s = this._appendArray(s, this._intToByteArray(0)), s = this._appendArray(s, this._intToByteArray(o))), await this.checkCommand("write target memory", this.ESP_WRITE_REG, s)
    }
    async sync() {
        this.debug("Sync");
        const e = new Uint8Array(36);
        let t;
        for (e[0] = 7, e[1] = 7, e[2] = 18, e[3] = 32, t = 0; t < 32; t++) e[4 + t] = 85;
        try {
            return await this.command(8, e, void 0, void 0, 100)
        } catch (e) {
            throw this.debug("Sync err " + e), e
        }
    }
    async _connectAttempt(e = "default_reset", t = !1) {
        if (this.debug("_connect_attempt " + e + " " + t), "no_reset" !== e)
            if (this.transport.getPid() === this.USB_JTAG_SERIAL_PID) await async function (e) {
                await e.setRTS(!1), await e.setDTR(!1), await Bs(100), await e.setDTR(!0), await e.setRTS(!1), await Bs(100), await e.setRTS(!0), await e.setDTR(!1), await e.setRTS(!0), await Bs(100), await e.setRTS(!1), await e.setDTR(!1)
            }(this.transport);
            else {
                const e = t ? "D0|R1|W100|W2000|D1|R0|W50|D0" : "D0|R1|W100|D1|R0|W50|D0";
                await $s(this.transport, e)
            } let i = 0,
            r = !0;
        for (; r;) {
            try {
                i += (await this.transport.read(1e3)).length
            } catch (e) {
                if (this.debug(e.message), e instanceof Error) {
                    r = !1;
                    break
                }
            }
            await this._sleep(50)
        }
        for (this.transport.slipReaderEnabled = !0, i = 7; i--;) {
            try {
                const e = await this.sync();
                return this.debug(e[0].toString()), "success"
            } catch (e) {
                e instanceof Error && (t ? this.info("_", !1) : this.info(".", !1))
            }
            await this._sleep(50)
        }
        return "error"
    }
    async connect(e = "default_reset", t = 7, i = !1) {
        let r, o;
        for (this.info("Подключение...", !1), await this.transport.connect(this.romBaudrate, this.serialOptions), r = 0; r < t && (o = await this._connectAttempt(e, !1), "success" !== o) && (o = await this._connectAttempt(e, !0), "success" !== o); r++);
        if ("success" !== o) throw new ni("Failed to connect with the device");
        if (this.info("\n\r", !1), !i) {
            const e = await this.readReg(1073745920) >>> 0;
            this.debug("Chip Magic " + e.toString(16));
            const t = await async function (e) {
                switch (e) {
                case 15736195: {
                    const {
                        ESP32ROM: e
                    } = await import("./esp32-D9Bry5AK.js");
                    return new e
                }
                case 1867591791:
                case 2084675695: {
                    const {
                        ESP32C2ROM: e
                    } = await import("./esp32c2-C0aHw_np.js");
                    return new e
                }
                case 1763790959:
                case 456216687:
                case 1216438383:
                case 1130455151: {
                    const {
                        ESP32C3ROM: e
                    } = await import("./esp32c3-1QKN64_Z.js");
                    return new e
                }
                case 752910447: {
                    const {
                        ESP32C6ROM: e
                    } = await import("./esp32c6-CgjBrh_Q.js");
                    return new e
                }
                case 3619110528: {
                    const {
                        ESP32H2ROM: e
                    } = await import("./esp32h2-Bm3EZXXU.js");
                    return new e
                }
                case 9: {
                    const {
                        ESP32S3ROM: e
                    } = await import("./esp32s3-DkYcGTTD.js");
                    return new e
                }
                case 1990: {
                    const {
                        ESP32S2ROM: e
                    } = await import("./esp32s2-DxMNCsFV.js");
                    return new e
                }
                case 4293968129: {
                    const {
                        ESP8266ROM: e
                    } = await import("./esp8266-DEFNY3lv.js");
                    return new e
                }
                default:
                    return null
                }
            }(e);
            if (null === this.chip) throw new ni(`Unexpected CHIP magic value ${e}. Failed to autodetect chip type.`);
            this.chip = t
        }
    }
    async detectChip(e = "default_reset") {
        await this.connect(e), this.info("Detecting chip type... ", !1), null != this.chip ? this.info(this.chip.CHIP_NAME) : this.info("unknown!")
    }
    async checkCommand(e = "", t = null, i = new Uint8Array(0), r = 0, o = 3e3) {
        this.debug("check_command " + e);
        const s = await this.command(t, i, r, void 0, o);
        return s[1].length > 4 ? s[1] : s[0]
    }
    async memBegin(e, t, i, r) {
        this.debug("mem_begin " + e + " " + t + " " + i + " " + r.toString(16));
        let o = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
        o = this._appendArray(o, this._intToByteArray(i)), o = this._appendArray(o, this._intToByteArray(r)), await this.checkCommand("enter RAM download mode", this.ESP_MEM_BEGIN, o)
    }
    async memBlock(e, t) {
        let i = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
        i = this._appendArray(i, this._intToByteArray(0)), i = this._appendArray(i, this._intToByteArray(0)), i = this._appendArray(i, e);
        const r = this.checksum(e);
        await this.checkCommand("write to target RAM", this.ESP_MEM_DATA, i, r)
    }
    async memFinish(e) {
        const t = 0 === e ? 1 : 0,
            i = this._appendArray(this._intToByteArray(t), this._intToByteArray(e));
        await this.checkCommand("leave RAM download mode", this.ESP_MEM_END, i, void 0, 50)
    }
    async flashSpiAttach(e) {
        const t = this._intToByteArray(e);
        await this.checkCommand("configure SPI flash pins", this.ESP_SPI_ATTACH, t)
    }
    async flashBegin(e, t) {
        const i = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE),
            r = this.chip.getEraseSize(t, e),
            o = new Date,
            s = o.getTime();
        let a = 3e3;
        0 == this.IS_STUB && (a = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, e)), this.debug("flash begin " + r + " " + i + " " + this.FLASH_WRITE_SIZE + " " + t + " " + e);
        let n = this._appendArray(this._intToByteArray(r), this._intToByteArray(i));
        n = this._appendArray(n, this._intToByteArray(this.FLASH_WRITE_SIZE)), n = this._appendArray(n, this._intToByteArray(t)), 0 == this.IS_STUB && (n = this._appendArray(n, this._intToByteArray(0))), await this.checkCommand("enter Flash download mode", this.ESP_FLASH_BEGIN, n, void 0, a);
        const l = o.getTime();
        return 0 != e && 0 == this.IS_STUB && this.info("Took " + (l - s) / 1e3 + "." + (l - s) % 1e3 + "s to erase flash block"), i
    }
    async flashDeflBegin(e, t, i) {
        const r = Math.floor((t + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE),
            o = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE),
            s = new Date,
            a = s.getTime();
        let n, l;
        this.IS_STUB ? (n = e, l = 3e3) : (n = o * this.FLASH_WRITE_SIZE, l = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, n)), this.info("Compressed " + e + " bytes to " + t + "...");
        let d = this._appendArray(this._intToByteArray(n), this._intToByteArray(r));
        d = this._appendArray(d, this._intToByteArray(this.FLASH_WRITE_SIZE)), d = this._appendArray(d, this._intToByteArray(i)), "ESP32-S2" !== this.chip.CHIP_NAME && "ESP32-S3" !== this.chip.CHIP_NAME && "ESP32-C3" !== this.chip.CHIP_NAME && "ESP32-C2" !== this.chip.CHIP_NAME || !1 !== this.IS_STUB || (d = this._appendArray(d, this._intToByteArray(0))), await this.checkCommand("enter compressed flash mode", this.ESP_FLASH_DEFL_BEGIN, d, void 0, l);
        const c = s.getTime();
        return 0 != e && !1 === this.IS_STUB && this.info("Took " + (c - a) / 1e3 + "." + (c - a) % 1e3 + "s to erase flash block"), r
    }
    async flashBlock(e, t, i) {
        let r = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
        r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, e);
        const o = this.checksum(e);
        await this.checkCommand("write to target Flash after seq " + t, this.ESP_FLASH_DATA, r, o, i)
    }
    async flashDeflBlock(e, t, i) {
        let r = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
        r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, e);
        const o = this.checksum(e);
        this.debug("flash_defl_block " + e[0].toString(16) + " " + e[1].toString(16)), await this.checkCommand("write compressed data to flash after seq " + t, this.ESP_FLASH_DEFL_DATA, r, o, i)
    }
    async flashFinish(e = !1) {
        const t = e ? 0 : 1,
            i = this._intToByteArray(t);
        await this.checkCommand("leave Flash mode", this.ESP_FLASH_END, i)
    }
    async flashDeflFinish(e = !1) {
        const t = e ? 0 : 1,
            i = this._intToByteArray(t);
        await this.checkCommand("leave compressed flash mode", this.ESP_FLASH_DEFL_END, i)
    }
    async runSpiflashCommand(e, t, i) {
        const r = this.chip.SPI_REG_BASE,
            o = r + 0,
            s = r + this.chip.SPI_USR_OFFS,
            a = r + this.chip.SPI_USR1_OFFS,
            n = r + this.chip.SPI_USR2_OFFS,
            l = r + this.chip.SPI_W0_OFFS;
        let d;
        d = null != this.chip.SPI_MOSI_DLEN_OFFS ? async (e, t) => {
            const i = r + this.chip.SPI_MOSI_DLEN_OFFS,
                o = r + this.chip.SPI_MISO_DLEN_OFFS;
            e > 0 && await this.writeReg(i, e - 1), t > 0 && await this.writeReg(o, t - 1)
        }: async (e, t) => {
            const i = a,
                r = (0 === t ? 0 : t - 1) << 8 | (0 === e ? 0 : e - 1) << 17;
            await this.writeReg(i, r)
        };
        const c = 1 << 18;
        if (i > 32) throw new ni("Reading more than 32 bits back from a SPI flash operation is unsupported");
        if (t.length > 64) throw new ni("Writing more than 64 bytes of data with one SPI command is unsupported");
        const h = 8 * t.length,
            p = await this.readReg(s),
            f = await this.readReg(n);
        let u, m = 1 << 31;
        i > 0 && (m |= 268435456), h > 0 && (m |= 134217728), await d(h, i), await this.writeReg(s, m);
        let v = 7 << 28 | e;
        if (await this.writeReg(n, v), 0 == h) await this.writeReg(l, 0);
        else {
            if (t.length % 4 != 0) {
                const e = new Uint8Array(t.length % 4);
                t = this._appendArray(t, e)
            }
            let e = l;
            for (u = 0; u < t.length - 4; u += 4) v = this._byteArrayToInt(t[u], t[u + 1], t[u + 2], t[u + 3]), await this.writeReg(e, v), e += 4
        }
        for (await this.writeReg(o, c), u = 0; u < 10 && (v = await this.readReg(o) & c, 0 != v); u++);
        if (10 === u) throw new ni("SPI command did not complete in time");
        const g = await this.readReg(l);
        return await this.writeReg(s, p), await this.writeReg(n, f), g
    }
    async readFlashId() {
        const e = new Uint8Array(0);
        return await this.runSpiflashCommand(159, e, 24)
    }
    async eraseFlash() {
        this.info("Erasing flash (this may take a while)...");
        let e = new Date;
        const t = e.getTime(),
            i = await this.checkCommand("erase flash", this.ESP_ERASE_FLASH, void 0, void 0, this.CHIP_ERASE_TIMEOUT);
        e = new Date;
        const r = e.getTime();
        return this.info("Chip erase completed successfully in " + (r - t) / 1e3 + "s"), i
    }
    toHex(e) {
        return Array.prototype.map.call(e, (e => ("00" + e.toString(16)).slice(-2))).join("")
    }
    async flashMd5sum(e, t) {
        const i = this.timeoutPerMb(this.MD5_TIMEOUT_PER_MB, t);
        let r = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
        r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0));
        let o = await this.checkCommand("calculate md5sum", this.ESP_SPI_FLASH_MD5, r, void 0, i);
        o instanceof Uint8Array && o.length > 16 && (o = o.slice(0, 16));
        return this.toHex(o)
    }
    async readFlash(e, t, i = null) {
        let r = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
        r = this._appendArray(r, this._intToByteArray(4096)), r = this._appendArray(r, this._intToByteArray(1024));
        const o = await this.checkCommand("read flash", this.ESP_READ_FLASH, r);
        if (0 != o) throw new ni("Failed to read memory: " + o);
        let s = new Uint8Array(0);
        for (; s.length < t;) {
            const e = await this.transport.read(this.FLASH_READ_TIMEOUT);
            if (!(e instanceof Uint8Array)) throw new ni("Failed to read memory: " + e);
            e.length > 0 && (s = this._appendArray(s, e), await this.transport.write(this._intToByteArray(s.length)), i && i(e, s.length, t))
        }
        return s
    }
    async runStub() {
        this.info("Uploading stub...");
        let e = Ls.Buffer.from(this.chip.ROM_TEXT, "base64").toString("binary"),
            t = e.split("").map((function (e) {
                return e.charCodeAt(0)
            }));
        const i = new Uint8Array(t);
        e = Ls.Buffer.from(this.chip.ROM_DATA, "base64").toString("binary"), t = e.split("").map((function (e) {
            return e.charCodeAt(0)
        }));
        const r = new Uint8Array(t);
        let o, s = Math.floor((i.length + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK);
        for (await this.memBegin(i.length, s, this.ESP_RAM_BLOCK, this.chip.TEXT_START), o = 0; o < s; o++) {
            const e = o * this.ESP_RAM_BLOCK,
                t = e + this.ESP_RAM_BLOCK;
            await this.memBlock(i.slice(e, t), o)
        }
        for (s = Math.floor((r.length + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK), await this.memBegin(r.length, s, this.ESP_RAM_BLOCK, this.chip.DATA_START), o = 0; o < s; o++) {
            const e = o * this.ESP_RAM_BLOCK,
                t = e + this.ESP_RAM_BLOCK;
            await this.memBlock(r.slice(e, t), o)
        }
        this.info("Running stub..."), await this.memFinish(this.chip.ENTRY);
        for (let e = 0; e < 100; e++) {
            const e = await this.transport.read(1e3, 6);
            if (79 === e[0] && 72 === e[1] && 65 === e[2] && 73 === e[3]) return this.info("Stub running..."), this.IS_STUB = !0, this.FLASH_WRITE_SIZE = 16384, this.chip
        }
        throw new ni("Failed to start stub. Unexpected response")
    }
    async changeBaud() {
        this.info("Changing baudrate to " + this.baudrate);
        const e = this.IS_STUB ? this.transport.baudrate : 0,
            t = this._appendArray(this._intToByteArray(this.baudrate), this._intToByteArray(e)),
            i = await this.command(this.ESP_CHANGE_BAUDRATE, t);
        this.debug(i[0].toString()), this.info("Changed"), await this.transport.disconnect(), await this._sleep(50), await this.transport.connect(this.baudrate, this.serialOptions);
        try {
            let e = 64;
            for (; e--;) {
                try {
                    await this.sync();
                    break
                } catch (e) {
                    this.debug(e.message)
                }
                await this._sleep(10)
            }
        } catch (e) {
            this.debug(e.message)
        }
    }
    async main(e = "default_reset") {
        await this.detectChip(e);
        const t = await this.chip.getChipDescription(this);
        return this.info("Chip is " + t), this.info("Features: " + await this.chip.getChipFeatures(this)), this.info("Crystal is " + await this.chip.getCrystalFreq(this) + "MHz"), this.info("MAC: " + await this.chip.readMac(this)), await this.chip.readMac(this), void 0 !== this.chip.postConnect && await this.chip.postConnect(this), await this.runStub(), this.romBaudrate !== this.baudrate && await this.changeBaud(), t
    }
    parseFlashSizeArg(e) {
        if (void 0 === this.chip.FLASH_SIZES[e]) throw new ni("Flash size " + e + " is not supported by this chip type. Supported sizes: " + this.chip.FLASH_SIZES);
        return this.chip.FLASH_SIZES[e]
    }
    _updateImageFlashParams(e, t, i, r, o) {
        if (this.debug("_update_image_flash_params " + i + " " + r + " " + o), e.length < 8) return e;
        if (t != this.chip.BOOTLOADER_FLASH_OFFSET) return e;
        if ("keep" === i && "keep" === r && "keep" === o) return this.info("Not changing the image"), e;
        const s = parseInt(e[0]);
        let a = parseInt(e[2]);
        const n = parseInt(e[3]);
        if (s !== this.ESP_IMAGE_MAGIC) return this.info("Warning: Image file at 0x" + t.toString(16) + " doesn't look like an image file, so not changing any flash settings."), e;
        if ("keep" !== r) {
            a = {
                qio: 0,
                qout: 1,
                dio: 2,
                dout: 3
            } [r]
        }
        let l = 15 & n;
        if ("keep" !== o) {
            l = {
                "40m": 0,
                "26m": 1,
                "20m": 2,
                "80m": 15
            } [o]
        }
        let d = 240 & n;
        "keep" !== i && (d = this.parseFlashSizeArg(i));
        const c = a << 8 | l + d;
        return this.info("Flash params set to " + c.toString(16)), parseInt(e[2]) !== a << 8 && (e = e.substring(0, 2) + (a << 8).toString() + e.substring(3)), parseInt(e[3]) !== l + d && (e = e.substring(0, 3) + (l + d).toString() + e.substring(4)), e
    }
    async writeFlash(e) {
        if (this.debug("EspLoader program"), "keep" !== e.flashSize) {
            const t = this.flashSizeBytes(e.flashSize);
            for (let i = 0; i < e.fileArray.length; i++)
                if (e.fileArray[i].data.length + e.fileArray[i].address > t) throw new ni(`File ${i+1} doesn't fit in the available flash`)
        }
        let t, i;
        !0 === this.IS_STUB && !0 === e.eraseAll && await this.eraseFlash();
        for (let r = 0; r < e.fileArray.length; r++) {
            this.debug("Data Length " + e.fileArray[r].data.length), t = e.fileArray[r].data;
            const o = e.fileArray[r].data.length % 4;
            if (o > 0 && (t += "ÿÿÿÿ".substring(4 - o)), i = e.fileArray[r].address, this.debug("Image Length " + t.length), 0 === t.length) {
                this.debug("Warning: File is empty");
                continue
            }
            t = this._updateImageFlashParams(t, i, e.flashSize, e.flashMode, e.flashFreq);
            let s = null;
            e.calculateMD5Hash && (s = e.calculateMD5Hash(t), this.debug("Image MD5 " + s));
            const a = t.length;
            let n;
            if (e.compress) {
                const e = this.bstrToUi8(t);
                t = this.ui8ToBstr(Ts(e, {
                    level: 9
                })), n = await this.flashDeflBegin(a, t.length, i)
            } else n = await this.flashBegin(a, i);
            let l = 0,
                d = 0;
            const c = t.length;
            e.reportProgress && e.reportProgress(r, 0, c);
            let h = new Date;
            const p = h.getTime();
            let f = 5e3;
            const u = new Is({
                chunkSize: 1
            });
            let m = 0;
            for (u.onData = function (e) {
                    m += e.byteLength
                }; t.length > 0;) {
                this.debug("Write loop " + i + " " + l + " " + n), this.info("Writing at 0x" + (i + m).toString(16) + "... (" + Math.floor(100 * (l + 1) / n) + "%)");
                const o = this.bstrToUi8(t.slice(0, this.FLASH_WRITE_SIZE));
                if (!e.compress) throw new ni("Yet to handle Non Compressed writes"); {
                    const e = m;
                    u.push(o, !1);
                    const t = m - e;
                    let i = 3e3;
                    this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, t) > 3e3 && (i = this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, t)), !1 === this.IS_STUB && (f = i), await this.flashDeflBlock(o, l, f), this.IS_STUB && (f = i)
                }
                d += o.length, t = t.slice(this.FLASH_WRITE_SIZE, t.length), l++, e.reportProgress && e.reportProgress(r, d, c)
            }
            this.IS_STUB && await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR, f), h = new Date;
            const v = h.getTime() - p;
            if (e.compress && this.info("Wrote " + a + " bytes (" + d + " compressed) at 0x" + i.toString(16) + " in " + v / 1e3 + " seconds."), s) {
                const e = await this.flashMd5sum(i, a);
                if (new String(e).valueOf() != new String(s).valueOf()) throw this.info("File  md5: " + s), this.info("Flash md5: " + e), new ni("MD5 of file does not match data in flash!");
                this.info("Hash of data verified.")
            }
        }
        this.info("Leaving..."), this.IS_STUB && (await this.flashBegin(0, 0), e.compress ? await this.flashDeflFinish() : await this.flashFinish())
    }
    async flashId() {
        this.debug("flash_id");
        const e = await this.readFlashId();
        this.info("Manufacturer: " + (255 & e).toString(16));
        const t = e >> 16 & 255;
        this.info("Device: " + (e >> 8 & 255).toString(16) + t.toString(16)), this.info("Detected flash size: " + this.DETECTED_FLASH_SIZES[t])
    }
    async getFlashSize() {
        this.debug("flash_id");
        const e = await this.readFlashId() >> 16 & 255;
        return this.DETECTED_FLASH_SIZES_NUM[e]
    }
    async hardReset() {
        await this.transport.setRTS(!0), await this._sleep(100), await this.transport.setRTS(!1)
    }
    async softReset() {
        if (this.IS_STUB) {
            if ("ESP8266" != this.chip.CHIP_NAME) throw new ni("Soft resetting is currently only supported on ESP8266");
            await this.command(this.ESP_RUN_USER_CODE, void 0, void 0, !1)
        } else await this.flashBegin(0, 0), await this.flashFinish(!1)
    }
}
const Ws = async e => {
    await e.device.setSignals({
        dataTerminalReady: !1,
        requestToSend: !0
    }), await _e(250), await e.device.setSignals({
        dataTerminalReady: !1,
        requestToSend: !1
    }), await _e(250)
}, Zs = (e, t = "") => {
    const i = new Blob([e], {
            type: "text/plain"
        }),
        r = URL.createObjectURL(i);
    ((e, t = "") => {
        const i = document.createElement("a");
        i.target = "_blank", i.href = e, i.download = t, document.body.appendChild(i), i.dispatchEvent(new MouseEvent("click")), document.body.removeChild(i)
    })(r, t), setTimeout((() => URL.revokeObjectURL(r)), 0)
};
console.log("ESP Web Tools 10.0.1 by Nabu Casa; https://esphome.github.io/esp-web-tools/");
class Vs extends r {
    constructor() {
        super(...arguments), this.logger = console, this._state = "DASHBOARD", this._installErase = !1, this._installConfirmed = !1, this._provisionForce = !1, this._wasProvisioned = !1, this._busy = !1, this._selectedSsid = null, this._bodyOverflow = null, this._handleDisconnect = () => {
            this._state = "ERROR", this._error = "Disconnected"
        }
    }
    render() {
        if (!this.port) return o ``;
        let e, t, i = !1;
        return void 0 === this._client && "INSTALL" !== this._state && "LOGS" !== this._state ? this._error ? [e, t] = this._renderError(this._error) : t = this._renderProgress("Подключение") : "INSTALL" === this._state ? [e, t, i] = this._renderInstall() : "ASK_ERASE" === this._state ? [e, t] = this._renderAskErase() : "ERROR" === this._state ? [e, t] = this._renderError(this._error) : "DASHBOARD" === this._state ? [e, t, i] = this._client ? this._renderDashboard() : this._renderDashboardNoImprov() : "PROVISION" === this._state ? [e, t] = this._renderProvision() : "LOGS" === this._state && ([e, t] = this._renderLogs()), o `
      <ew-dialog
        open
        .heading=${e}
        @cancel=${this._preventDefault}
        @closed=${this._handleClose}
      >
        ${e?o`<div slot="headline">${e}</div>`:""}
        ${i?o`
              <ew-icon-button slot="headline" @click=${this._closeDialog}>
                ${Gt}
              </ew-icon-button>
            `:""}
        ${t}
      </ew-dialog>
    `
    }
    _renderProgress(e, t) {
        return o `
      <ewt-page-progress
        slot="content"
        .label=${e}
        .progress=${t}
      ></ewt-page-progress>
    `
    }
    _renderError(e) {
        return ["Ошибка", o `
      <ewt-page-message
        slot="content"
        .icon=${"⚠️"}
        .label=${e}
      ></ewt-page-message>
      <div slot="actions">
        <ew-text-button @click=${this._closeDialog}>Закрыть</ew-text-button>
      </div>
    `]
    }
    _renderDashboard() {
        const e = this._manifest.name;
        let t;
        return t = o `
      <div slot="content">
        <ew-list>
          <ew-list-item>
            <div slot="headline">Connected to ${this._info.name}</div>
            <div slot="supporting-text">
              ${this._info.firmware}&nbsp;${this._info.version}
              (${this._info.chipFamily})
            </div>
          </ew-list-item>
          ${this._isSameVersion?"":o`
                <ew-list-item
                  type="button"
                  @click=${()=>{this._isSameFirmware?this._startInstall(!1):this._manifest.new_install_prompt_erase?this._state="ASK_ERASE":this._startInstall(!0)}}
                >
                  ${Kt}
                  <div slot="headline">
                    ${this._isSameFirmware?`Обновить ${this._manifest.name}`:`Прошить ${this._manifest.name}`}
                  </div>
                </ew-list-item>
              `}
          ${void 0===this._client.nextUrl?"":o`
                <ew-list-item
                  type="link"
                  href=${this._client.nextUrl}
                  target="_blank"
                >
                  ${Jt}
                  <div slot="headline">Visit Device</div>
                </ew-list-item>
              `}
          ${this._manifest.home_assistant_domain&&this._client.state===ii.PROVISIONED?o`
                <ew-list-item
                  type="link"
                  href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                  target="_blank"
                >
                  ${Qt}
                  <div slot="headline">Add to Home Assistant</div>
                </ew-list-item>
              `:""}
          <ew-list-item
            type="button"
            @click=${()=>{this._state="PROVISION",this._client.state===ii.PROVISIONED&&(this._provisionForce=!0)}}
          >
            ${Yt}
            <div slot="headline">
              ${this._client.state===ii.READY?"Connect to Wi-Fi":"Change Wi-Fi"}
            </div>
          </ew-list-item>
          <ew-list-item
            type="button"
            @click=${async()=>{const e=this._client;e&&(await this._closeClientWithoutEvents(e),await _e(100)),this._client=void 0,this._state="LOGS"}}
          >
            ${Xt}
            <div slot="headline">Логи и консоль</div>
          </ew-list-item>
          ${this._isSameFirmware&&this._manifest.funding_url?o`
                <ew-list-item
                  type="link"
                  href=${this._manifest.funding_url}
                  target="_blank"
                >
                  <div slot="headline">Fund Development</div>
                </ew-list-item>
              `:""}
          ${this._isSameVersion?o`
                <ew-list-item
                  type="button"
                  class="danger"
                  @click=${()=>this._startInstall(!0)}
                >
                  <div slot="headline">Erase User Data</div>
                </ew-list-item>
              `:""}
        </ew-list>
      </div>
    `, [e, t, !0]
    }
    _renderDashboardNoImprov() {
        const e = this._manifest.name;
        let t;
        return t = o `
      <div slot="content">
        <ew-list>
          <ew-list-item
            type="button"
            @click=${()=>{this._manifest.new_install_prompt_erase?this._state="ASK_ERASE":this._startInstall(!0)}}
          >
            ${Kt}
            <div slot="headline">${`Прошить ${this._manifest.name}`}</div>
          </ew-list-item>
          <ew-list-item
            type="button"
            @click=${async()=>{this._client=void 0,this._state="LOGS"}}
          >
            ${Xt}
            <div slot="headline">Логи и консоль</div>
          </ew-list-item>
        </ew-list>
      </div>
    `, [e, t, !0]
    }
    _renderProvision() {
        var e;
        let t, i = "Configure Wi-Fi";
        if (this._busy) return [i, this._renderProgress(void 0 === this._ssids ? "Scanning for networks" : "Trying to connect")];
        if (this._provisionForce || this._client.state !== ii.PROVISIONED) {
            let i;
            switch (this._client.error) {
            case 3:
                i = "Unable to connect";
                break;
            case 254:
                i = "Timeout";
                break;
            case 0:
            case 2:
                break;
            default:
                i = `Unknown error (${this._client.error})`
            }
            const r = null === (e = this._ssids) || void 0 === e ? void 0 : e.find((e => e.name === this._selectedSsid));
            t = o `
        <ew-icon-button slot="headline" @click=${this._updateSsids}>
          ${jt}
        </ew-icon-button>
        <div slot="content">
          <div>Connect your device to the network to start using it.</div>
          ${i?o`<p class="error">${i}</p>`:""}
          ${null!==this._ssids?o`
                <ew-filled-select
                  menu-positioning="fixed"
                  label="Network"
                  @change=${e=>{const t=e.target.selectedIndex;this._selectedSsid=t===this._ssids.length?null:this._ssids[t].name}}
                >
                  ${this._ssids.map((e=>o`
                      <ew-select-option
                        .selected=${r===e}
                        .value=${e.name}
                      >
                        ${e.name}
                      </ew-select-option>
                    `))}
                  <ew-divider></ew-divider>
                  <ew-select-option .selected=${!r}>
                    Join other…
                  </ew-select-option>
                </ew-filled-select>
              `:""}
          ${r?"":o`
                  <ew-filled-text-field
                    label="Network Name"
                    name="ssid"
                  ></ew-filled-text-field>
                `}
          ${!r||r.secured?o`
                <ew-filled-text-field
                  label="Password"
                  name="password"
                  type="password"
                ></ew-filled-text-field>
              `:""}
        </div>
        <div slot="actions">
          <ew-text-button
            @click=${()=>{this._state="DASHBOARD"}}
          >
            ${this._installState&&this._installErase?"Пропустить":"Назад"}
          </ew-text-button>
          <ew-text-button @click=${this._doProvision}>Connect</ew-text-button>
        </div>
      `
        } else {
            i = void 0;
            const e = !this._wasProvisioned && (void 0 !== this._client.nextUrl || "home_assistant_domain" in this._manifest);
            t = o `
        <div slot="content">
          <ewt-page-message
            .icon=${"🎉"}
            label="Device connected to the network!"
          ></ewt-page-message>
          ${e?o`
                <ew-list>
                  ${void 0===this._client.nextUrl?"":o`
                        <ew-list-item
                          type="link"
                          href=${this._client.nextUrl}
                          target="_blank"
                          @click=${()=>{this._state="DASHBOARD"}}
                        >
                          ${Jt}
                          <div slot="headline">Visit Device</div>
                        </ew-list-item>
                      `}
                  ${this._manifest.home_assistant_domain?o`
                        <ew-list-item
                          type="link"
                          href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                          target="_blank"
                          @click=${()=>{this._state="DASHBOARD"}}
                        >
                          ${Qt}
                          <div slot="headline">Add to Home Assistant</div>
                        </ew-list-item>
                      `:""}
                  <ew-list-item
                    type="button"
                    @click=${()=>{this._state="DASHBOARD"}}
                  >
                    <div slot="start" class="fake-icon"></div>
                    <div slot="headline">Skip</div>
                  </ew-list-item>
                </ew-list>
              `:""}
        </div>

        ${e?"":o`
              <div slot="actions">
                <ew-text-button
                  @click=${()=>{this._state="DASHBOARD"}}
                >
                  Continue
                </ew-text-button>
              </div>
            `}
      `
        }
        return [i, t]
    }
    _renderAskErase() {
        return ["Erase device", o `
      <div slot="content">
        <div>
          Do you want to erase the device before installing
          ${this._manifest.name}? All data on the device will be lost.
        </div>
        <label class="formfield">
          <ew-checkbox touch-target="wrapper" class="danger"></ew-checkbox>
          Erase device
        </label>
      </div>
      <div slot="actions">
        <ew-text-button
          @click=${()=>{this._state="DASHBOARD"}}
        >
          Назад
        </ew-text-button>
        <ew-text-button
          @click=${()=>{const e=this.shadowRoot.querySelector("ew-checkbox");this._startInstall(e.checked)}}
        >
          Next
        </ew-text-button>
      </div>
    `]
    }
    _renderInstall() {
        let e, t;
        const i = !this._installErase && this._isSameFirmware;
        if (!this._installConfirmed && this._isSameVersion) e = "Erase User Data", t = o `
        <div slot="content">
          Do you want to reset your device and erase all user data from your
          device?
        </div>
        <div slot="actions">
          <ew-text-button class="danger" @click=${this._confirmInstall}>
            Erase User Data
          </ew-text-button>
        </div>
      `;
        else if (this._installConfirmed)
            if (this._installState && "initializing" !== this._installState.state && "preparing" !== this._installState.state)
                if ("erasing" === this._installState.state) e = "Прошивка", t = this._renderProgress("Стирание");
                else if ("writing" === this._installState.state || "finished" === this._installState.state && void 0 === this._client) {
            let i, r;
            e = "Прошивка", "finished" === this._installState.state ? r = "Завершение..." : this._installState.details.percentage < 4 ? r = "Прошивка..." : i = this._installState.details.percentage, t = this._renderProgress(o `
          ${r?o`${r}<br />`:""}
          <br />
          Это может занять
          ${"ESP8266"===this._installState.chipFamily?"одну минуту":"2 минуты"}.<br />
          Не закрывайте вкладку чтобы избежать ошибок
        `, i)
        } else if ("finished" === this._installState.state) {
            e = void 0;
            const i = null !== this._client;
            t = o `
        <ewt-page-message
          slot="content"
          .icon=${"🎉"}
          label="Прошивка завершена!"
        ></ewt-page-message>

        <div slot="actions">
          <ew-text-button
            @click=${()=>{this._state=i&&this._installErase?"PROVISION":"DASHBOARD"}}
          >
            Далее
          </ew-text-button>
        </div>
      `
        } else "error" === this._installState.state && (e = "Ошибка прошивки", t = o `
        <ewt-page-message
          slot="content"
          .icon=${"⚠️"}
          .label=${this._installState.message}
        ></ewt-page-message>
        <div slot="actions">
          <ew-text-button
            @click=${async()=>{this._initialize(),this._state="DASHBOARD"}}
          >
            Назад
          </ew-text-button>
        </div>
      `);
        else e = "Прошивка...", t = this._renderProgress("Подготовка к прошивке");
        else {
            e = "Продолжить прошивку?";
            const r = i ? "обновиться на" : "прошить";
            t = o `
        <div slot="content">
          ${i?o`Your device is running
                ${this._info.firmware}&nbsp;${this._info.version}.<br /><br />`:""}
          Вы хотите ${r}
          ${this._manifest.name}&nbsp;${this._manifest.version}?
          ${this._installErase?o`<br /><br />Все данные на устройстве будут удалены.`:""}
        </div>
        <div slot="actions">
          <ew-text-button
            @click=${()=>{this._state="DASHBOARD"}}
          >
            Назад
          </ew-text-button>
          <ew-text-button @click=${this._confirmInstall}>
            Прошить
          </ew-text-button>
        </div>
      `
        }
        return [e, t, !1]
    }
    _renderLogs() {
        let e;
        return e = o `
      <div slot="content">
        <ewt-console .port=${this.port} .logger=${this.logger}></ewt-console>
      </div>
      <div slot="actions">
        <ew-text-button
          @click=${async()=>{await this.shadowRoot.querySelector("ewt-console").reset()}}
        >
          Перезагрузить 
        </ew-text-button>
        <ew-text-button
          @click=${()=>{Zs(this.shadowRoot.querySelector("ewt-console").logs(),"esp-web-tools-logs.txt"),this.shadowRoot.querySelector("ewt-console").reset()}}
        >
          Скачать логи
        </ew-text-button>
        <ew-text-button
          @click=${async()=>{await this.shadowRoot.querySelector("ewt-console").disconnect(),this._state="DASHBOARD",this._initialize()}}
        >
          Назад
        </ew-text-button>
      </div>
    `, ["Логи", e]
    }
    willUpdate(e) {
        e.has("_state") && ("ERROR" !== this._state && (this._error = void 0), "PROVISION" === this._state ? this._updateSsids() : this._provisionForce = !1, "INSTALL" === this._state && (this._installConfirmed = !1, this._installState = void 0))
    }
    async _updateSsids(e = 0) {
        const t = this._ssids;
        let i;
        this._ssids = void 0, this._busy = !0;
        try {
            i = await this._client.scan()
        } catch (e) {
            return void 0 === this._ssids && (this._ssids = null, this._selectedSsid = null), void(this._busy = !1)
        }
        if (0 === i.length && e < 3) return console.log("SCHEDULE RETRY", e), void setTimeout((() => this._updateSsids(e + 1)), 1e3);
        t ? this._selectedSsid && !i.find((e => e.name === this._selectedSsid)) && (this._selectedSsid = i[0].name) : this._selectedSsid = i.length ? i[0].name : null, this._ssids = i, this._busy = !1
    }
    firstUpdated(e) {
        super.firstUpdated(e), this._bodyOverflow = document.body.style.overflow, document.body.style.overflow = "hidden", this._initialize()
    }
    updated(e) {
        super.updated(e), e.has("_state") && this.setAttribute("state", this._state), "PROVISION" === this._state && (e.has("_selectedSsid") && null === this._selectedSsid ? this._focusFormElement("ew-filled-text-field[name=ssid]") : e.has("_ssids") && this._focusFormElement())
    }
    _focusFormElement(e = "ew-filled-text-field, ew-filled-select") {
        const t = this.shadowRoot.querySelector(e);
        t && t.updateComplete.then((() => setTimeout((() => t.focus()), 100)))
    }
    async _initialize(e = !1) {
        if (null === this.port.readable || null === this.port.writable) return this._state = "ERROR", void(this._error = "Serial port is not readable/writable. Close any other application using it and try again.");
        try {
            this._manifest = await (async e => {
                const t = new URL(e, location.toString()).toString(),
                    i = await fetch(t),
                    r = await i.json();
                return "new_install_skip_erase" in r && (console.warn('Manifest option "new_install_skip_erase" is deprecated. Use "new_install_prompt_erase" instead.'), r.new_install_skip_erase && (r.new_install_prompt_erase = !0)), r
            })(this.manifestPath)
        } catch (e) {
            return this._state = "ERROR", void(this._error = "Не удалось загрузить manifest, сообщите об этом разработчику (@m1ner203)")
        }
        if (0 === this._manifest.new_install_improv_wait_time) return void(this._client = null);
        const t = new ai(this.port, this.logger);
        t.addEventListener("state-changed", (() => {
            this.requestUpdate()
        })), t.addEventListener("error-changed", (() => this.requestUpdate()));
        try {
            const i = e ? void 0 !== this._manifest.new_install_improv_wait_time ? 1e3 * this._manifest.new_install_improv_wait_time : 1e4 : 1e3;
            this._info = await t.initialize(i), this._client = t, t.addEventListener("disconnect", this._handleDisconnect)
        } catch (e) {
            this._info = void 0, e instanceof oi ? (this._state = "ERROR", this._error = "COM порт занят. Закройте приложения которые могут его использовать и повторите попытку.") : (this._client = null, this.logger.error("Improv initialization failed.", e))
        }
    }
    _startInstall(e) {
        this._state = "INSTALL", this._installErase = e, this._installConfirmed = !1
    }
    async _confirmInstall() {
        this._installConfirmed = !0, this._installState = void 0, this._client && await this._closeClientWithoutEvents(this._client), this._client = void 0, await this.port.close(), (async (e, t, i, r, o) => {
            let s, a;
            const n = t => e({
                    ...t,
                    manifest: r,
                    build: s,
                    chipFamily: a
                }),
                l = new Cs(t),
                d = new qs({
                    transport: l,
                    baudrate: 115200,
                    romBaudrate: 115200,
                    enableTracing: !1
                });
            window.esploader = d, n({
                state: "initializing",
                message: "Initializing...",
                details: {
                    done: !1
                }
            });
            try {
                await d.main(), await d.flashId()
            } catch (e) {
                return console.error(e), n({
                    state: "error",
                    message: "Не удалось запустить прошивку. Попробуйте перезагрузить устройство или зажать кнопку BOOT когда запускаете прошивку.",
                    details: {
                        error: "failed_initialize",
                        details: e
                    }
                }), await Ws(l), void await l.disconnect()
            }
            if (a = d.chip.CHIP_NAME, !d.chip.ROM_TEXT) return n({
                state: "error",
                message: `Контроллер ${a} не поддерживается`,
                details: {
                    error: "not_supported",
                    details: `Контроллер ${a} не поддерживается`
                }
            }), await Ws(l), void await l.disconnect();
            if (n({
                    state: "initializing",
                    message: `Initialized. Found ${a}`,
                    details: {
                        done: !0
                    }
                }), s = r.builds.find((e => e.chipFamily === a)), !s) return n({
                state: "error",
                message: `Контроллер ${a} не поддерживается этой прошивкой.`,
                details: {
                    error: "not_supported",
                    details: a
                }
            }), await Ws(l), void await l.disconnect();
            n({
                state: "preparing",
                message: "Подготовка...",
                details: {
                    done: !1
                }
            });
            const c = new URL(i, location.toString()).toString(),
                h = s.parts.map((async e => {
                    const t = new URL(e.path, c).toString(),
                        i = await fetch(t);
                    if (!i.ok) throw new Error(`Не удалось загрузить прошивку ${e.path}: ${i.status}`);
                    const r = new FileReader,
                        o = await i.blob();
                    return new Promise((e => {
                        r.addEventListener("load", (() => e(r.result))), r.readAsBinaryString(o)
                    }))
                })),
                p = [];
            let f = 0;
            for (let e = 0; e < h.length; e++) try {
                const t = await h[e];
                p.push({
                    data: t,
                    address: s.parts[e].offset
                }), f += t.length
            } catch (e) {
                return n({
                    state: "error",
                    message: e.message,
                    details: {
                        error: "failed_firmware_download",
                        details: e.message
                    }
                }), await Ws(l), void await l.disconnect()
            }
            n({
                state: "preparing",
                message: "Подготовка к прошивке",
                details: {
                    done: !0
                }
            }), o && (n({
                state: "erasing",
                message: "Стираем устройство...",
                details: {
                    done: !1
                }
            }), await d.eraseFlash(), n({
                state: "erasing",
                message: "Устройство стёрто",
                details: {
                    done: !0
                }
            })), n({
                state: "writing",
                message: "Прошито: 0%",
                details: {
                    bytesTotal: f,
                    bytesWritten: 0,
                    percentage: 0
                }
            });
            let u = 0;
            try {
                await d.writeFlash({
                    fileArray: p,
                    flashSize: "keep",
                    flashMode: "keep",
                    flashFreq: "keep",
                    eraseAll: !1,
                    compress: !0,
                    reportProgress: (e, t, i) => {
                        const r = t / i * p[e].data.length,
                            o = Math.floor((u + r) / f * 100);
                        t !== i ? n({
                            state: "writing",
                            message: `Прошито: ${o}%`,
                            details: {
                                bytesTotal: f,
                                bytesWritten: u + t,
                                percentage: o
                            }
                        }) : u += r
                    }
                })
            } catch (e) {
                return n({
                    state: "error",
                    message: e.message,
                    details: {
                        error: "write_failed",
                        details: e
                    }
                }), await Ws(l), void await l.disconnect()
            }
            n({
                state: "writing",
                message: "Writing complete",
                details: {
                    bytesTotal: f,
                    bytesWritten: u,
                    percentage: 100
                }
            }), await _e(100), console.log("HARD RESET"), await Ws(l), console.log("DISCONNECT"), await l.disconnect(), n({
                state: "finished",
                message: "All done!"
            })
        })((e => {
            this._installState = e, "finished" === e.state ? _e(100).then((() => this.port.open({
                baudRate: 115200
            }))).then((() => this._initialize(!0))).then((() => this.requestUpdate())) : "error" === e.state && _e(100).then((() => this.port.open({
                baudRate: 115200
            })))
        }), this.port, this.manifestPath, this._manifest, this._installErase)
    }
    async _doProvision() {
        var e;
        this._busy = !0, this._wasProvisioned = this._client.state === ii.PROVISIONED;
        const t = null === this._selectedSsid ? this.shadowRoot.querySelector("ew-filled-text-field[name=ssid]").value : this._selectedSsid,
            i = (null === (e = this.shadowRoot.querySelector("ew-filled-text-field[name=password]")) || void 0 === e ? void 0 : e.value) || "";
        try {
            await this._client.provision(t, i, 3e4)
        } catch (e) {
            return
        } finally {
            this._busy = !1, this._provisionForce = !1
        }
    }
    _closeDialog() {
        this.shadowRoot.querySelector("ew-dialog").close()
    }
    async _handleClose() {
        this._client && await this._closeClientWithoutEvents(this._client), ((e, t, i, r) => {
            r = r || {};
            const o = new CustomEvent(t, {
                bubbles: void 0 === r.bubbles || r.bubbles,
                cancelable: Boolean(r.cancelable),
                composed: void 0 === r.composed || r.composed,
                detail: i
            });
            e.dispatchEvent(o)
        })(this, "closed"), document.body.style.overflow = this._bodyOverflow, this.parentNode.removeChild(this)
    }
    get _isSameFirmware() {
        var e;
        return !!this._info && ((null === (e = this.overrides) || void 0 === e ? void 0 : e.checkSameFirmware) ? this.overrides.checkSameFirmware(this._manifest, this._info) : this._info.firmware === this._manifest.name)
    }
    get _isSameVersion() {
        return this._isSameFirmware && this._info.version === this._manifest.version
    }
    async _closeClientWithoutEvents(e) {
        e.removeEventListener("disconnect", this._handleDisconnect), await e.close()
    }
    _preventDefault(e) {
        e.preventDefault()
    }
}
Vs.styles = [I, s `
      :host {
        --mdc-dialog-max-width: 390px;
      }
      div[slot="headline"] {
        padding-right: 48px;
      }
      ew-icon-button[slot="headline"] {
        position: absolute;
        right: 4px;
        top: 8px;
      }
      ew-icon-button[slot="headline"] svg {
        padding: 8px;
        color: var(--text-color);
      }
      .dialog-nav svg {
        color: var(--text-color);
      }
      .table-row {
        display: flex;
      }
      .table-row.last {
        margin-bottom: 16px;
      }
      .table-row svg {
        width: 20px;
        margin-right: 8px;
      }
      ew-filled-text-field,
      ew-filled-select {
        display: block;
        margin-top: 16px;
      }
      label.formfield {
        display: inline-flex;
        align-items: center;
        padding-right: 8px;
      }
      ew-list {
        margin: 0 -24px;
        padding: 0;
      }
      ew-list-item svg {
        height: 24px;
      }
      ewt-page-message + ew-list {
        padding-top: 16px;
      }
      .fake-icon {
        width: 24px;
      }
      .error {
        color: var(--danger-color);
      }
      .danger {
        --mdc-theme-primary: var(--danger-color);
        --mdc-theme-secondary: var(--danger-color);
        --md-sys-color-primary: var(--danger-color);
        --md-sys-color-on-surface: var(--danger-color);
      }
      button.link {
        background: none;
        color: #FF8C00;
        border: none;
        padding: 0;
        font: inherit;
        text-align: left;
        text-decoration: underline;
        cursor: pointer;
      }
      :host([state="LOGS"]) ew-dialog {
        max-width: 90vw;
        max-height: 90vh;
      }
      ewt-console {
        width: calc(80vw - 48px);
        height: calc(90vh - 168px);
      }
    `], t([m()], Vs.prototype, "_client", void 0), t([m()], Vs.prototype, "_state", void 0), t([m()], Vs.prototype, "_installErase", void 0), t([m()], Vs.prototype, "_installConfirmed", void 0), t([m()], Vs.prototype, "_installState", void 0), t([m()], Vs.prototype, "_provisionForce", void 0), t([m()], Vs.prototype, "_error", void 0), t([m()], Vs.prototype, "_busy", void 0), t([m()], Vs.prototype, "_ssids", void 0), t([m()], Vs.prototype, "_selectedSsid", void 0), customElements.define("ewt-install-dialog", Vs);
export {
    Vs as EwtInstallDialog
};