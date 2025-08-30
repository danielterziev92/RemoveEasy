interface LogoProps {
    t: (key: string) => string;
}

export default function Logo({t}: LogoProps) {
    return (
        <a href="/" className="flex items-center gap-2 z-20">
            <img
                src="/images/0874879a-fa04-420c-bb0d-e3058295bc79.png"
                alt="Re Move Easy Logo"
                className="h-10 md:h-12"
            />
            <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold text-primary">
          {t("Re Move Easy")}
        </span>
                <span
                    className="text-sm md:text-base font-medium"
                    style={{fontFamily: 'cursive', color: '#4169E1'}}
                >
          {t("MEN & VAN SERVICES")}
        </span>
            </div>
        </a>
    );
}