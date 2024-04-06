! function(e) {
    "use strict";

    function t(e) {
        return new Proxy(new URLSearchParams(window.location.search), {
            get: (e, t) => e.get(t)
        })[e]
    }

    function o() {
        return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + 9 * Math.random() * Math.pow(10, 12)).toString(36)
    }
    var n = e("#swipe-pages-page").val(),
        a = e("#swipe-pages-funnel").val(),
        i = localStorage.getItem(a + "-view"),
        r = localStorage.getItem(n + "-view");
    localStorage.getItem(a + "-view") || (i = o(), localStorage.setItem(a + "-view", i)), localStorage.getItem(n + "-view") || (r = o(), localStorage.setItem(n + "-view", r));
    var s, c, g = {
            pageId: n,
            variantId: e("#swipe-pages-variant").val(),
            funnelId: e("#swipe-pages-funnel").val() || "",
            accountId: e("#swipe-pages-account").val(),
            subaccountId: e("#swipe-pages-subaccount").val(),
            domain: window.location.hostname,
            browser: (c = window.navigator.userAgent, c.match(/chrome|chromium|crios/i) ? "Chrome" : c.match(/firefox|fxios/i) ? "Firefox" : c.match(/safari/i) ? "Safari" : c.match(/opr\//i) ? "Opera" : c.match(/edg/i) ? "Edge" : "Other"),
            referrer: (s = document.referrer, (s.indexOf("://") > -1 ? s.split("/")[2] : s.split("/")[0]).split(":")[0].replace("www.", "")),
            screen: window.outerHeight + "x" + window.outerWidth,
            device: function() {
                var e = window.navigator.userAgent,
                    t = window.navigator.platform,
                    o = null;
                return -1 !== ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(t) ? o = "Mac OS" : -1 !== ["iPhone", "iPad", "iPod"].indexOf(t) ? o = "iOS" : -1 !== ["Win32", "Win64", "Windows", "WinCE"].indexOf(t) ? o = "Windows" : /Android/.test(e) ? o = "Android" : !o && /Linux/.test(t) && (o = "Linux"), o
            }(),
            utm_source: t("utm_source"),
            utm_medium: t("utm_medium"),
            utm_campaign: t("utm_campaign"),
            utm_content: t("utm_content"),
            utm_term: t("utm_term"),
            clientId: i,
            sessionId: r,
            visit_time: Date.now(),
            timezone: (new Date).getTimezoneOffset()
        },
        l = window.spAnalyticsConfig && window.spAnalyticsConfig.apiEndPoint ? window.spAnalyticsConfig.apiEndPoint : "https://events.swipepages.com/api/events";
    window.spAnalytics = {
        track: function(t, o) {
            if ((o = o || {}) && !0 === o.conversion) {
                var n = [];
                if (localStorage.getItem("spConversion")) {
                    try {
                        n = JSON.parse(localStorage.getItem("spConversion"))
                    } catch (e) {
                        console.log(e)
                    } - 1 !== n.indexOf(g.pageId) ? o.conversion = !1 : n.push(g.pageId)
                } else n.push(g.pageId);
                localStorage.setItem("spConversion", JSON.stringify(n))
            }
            var a = {};
            Object.keys(g).forEach((function(e) {
                a[e] = g[e]
            })), o && "object" == typeof o && Object.keys(o).forEach((function(e) {
                a[e] = o[e]
            })), localStorage.spWebhook && (a.webhook = localStorage.spWebhook);
            var i = new Date;
            a.timestamp = Math.floor(i.getTime() / 1e3);
            var r = {
                event: t,
                properties: a
            };
            o.contact && (r.user = {
                id: o.contact
            }), navigator.sendBeacon ? navigator.sendBeacon(l, JSON.stringify(r)) : e.ajax(l, {
                method: "POST",
                dataType: "json",
                data: r,
                success: function(e) {},
                error: function(e, t, o) {
                    console.log("Analytics error:", o)
                }
            })
        }
    }
}(jQuery);