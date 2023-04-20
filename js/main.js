var app = new Vue({
    el: "main",
    data: {
        products: [
            { id: 1, title: "Маркони", short_text: "Sweet pepper", image: "product-1.jpg", desc: "Итальянский старый сорт перца, внушительного размера плод оригинальной формы и с плотными мясистыми стенками. Он относится к раннеспелым видам и пользуется спросом среди любителей. Полное созревание происходит через 100-115 дней, это промежуточное значение между раннеспелыми и среднеспелыми разновидностями. Но в зарубежных источниках его относят к первому варианту, да и по срокам он ближе. Куст формируется среднерослый, побеги требуют пасынкования. Плоды растут до 20 см в длину, диаметр 5-7 см, вес 150-200 г, иногда до 300 г. Толщина стенки от 4 до 6 мм. С 1 кв. метра собирают от 7 до 10 кг." },
            { id: 2, title: "Квадрато Асти", short_text: "Sweet pepper", image: "product-2.jpg", desc: "Этот сорт перца применяется свежим и консервируется. Он характеризуется хорошей всхожестью. Среднерослые, имеющие форму куба плоды с большим содержанием сахара созревают рано, через 110 дней. Они разбиты на 4 камеры, весят примерно 200-220 г, размер 10х10см. Их можно есть уже на сроках технической зрелости, пока они еще имеют зеленый цвет. Это редкость среди аналогов. Биологическая зрелость отмечается красным цветом." },
            { id: 3, title: "Шорок Шари", short_text: "Sweet pepper", image: "product-3.jpg", desc: "Для созревания требуется 100-110 суток. Зарубежные источники относят его к ранним видам. Растение вырастает компактным, 60-65 см в высоту. Кусты мощные, не очень разлогие, покрыты средними по размеру листьями. Цвет кубовидных плодов оранжевый - при биологической спелости. Камеры заметно разделены. Вес примерно 100-150 г. Толщина стенок около 9 мм. Твердые (это обеспечивает хорошую транспортабельность) и сочные." },
            { id: 4, title: "Айвенго", short_text: "Sweet pepper", image: "product-4.jpg", desc: "Этот сорт перца к моменту биологической зрелости меняет цвет с кремово-белого на красный. вырастает и созревает за 125-135 дней. Плоды весом 95-140 г имеют вид почти правильного конуса. Толщина стен примерно 7 мм. Растет под пленочной защитой и вовсе без нее. Кусты вытягиваются до 60-70 см, оставаясь компактными. Они являются полуштамбовыми." },
            { id: 5, title: "Антей", short_text: "Sweet pepper", image: "product-5.jpg", desc: "Крупноплодный, низкорослый сорт перца среднего срока созревания Выращивается как под защитой, так и без нее. Период вегетации 125-135 дней. Дает 6-7 кг с 1 кв. метра. густота посадки - 6-7 кустов на 1 кв. м. Полная зрелость характеризуется переходом от светло-зеленого к красному цвету. Вес конусовидно-призмовидного плода - 200-300 г." }
        ],
        product: null,
        btnVisible: 0,
        formVisible: 1,
        contactFields: {},
        cart: [],
    },
    mounted: function () {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods: {
        makeOrder: function () {
          this.formVisible = 0;
          this.cart = [];
          window.localStorage.removeItem("cart")
        },
        removeFromCart: function (id) {
            var cart = window.localStorage.getItem("cart").split(",");
            var i = cart.indexOf(String(id));
            if (i !== -1) {
                delete cart[i];
            }
            cart = cart.filter(i => i);
            window.localStorage.setItem("cart", cart);
            this.getCart();
        },
        getCart: function () {
            if (! window.localStorage.getItem("cart")) {
                return [];
            }
            var cart = [];
            for (const c of window.localStorage.getItem("cart").split(",")) {
                var product = this.products.find(p => p.id === +c);
                if (product) {
                    cart.push(product);
                }
            }
            this.cart = cart;

            return this.cart;
        },
        addToCart: function (id) {
            var cart = [];
            if (window.localStorage.getItem("cart")) {
                cart = window.localStorage.getItem("cart").split(",");
            }
            if (cart.indexOf(String(id)) === -1) {
                cart.push(id);
                window.localStorage.setItem("cart", cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function () {
            if (!window.localStorage.getItem("cart")) {
                return;
            }
            if (this.product && this.product.id && window.localStorage.getItem("cart").split(",").indexOf(String(this.product.id)) !== -1) this.btnVisible = 1
        },
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace("#", "")
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) this.product = this.products[i]
                    }
                }
            }
        }
    }
});  