import NavCard from "@/components/shared/NavCard";

export default function Page() {
    return (
        <div className="flex flex-1 justify-center items-center gap-10">
            <NavCard
                title="Usuários"
                description="Gerencie todos os usuários"
                content="Visualize, edite e gerencie contas de usuários."
                href="/admin/usuarios"
            />
            <NavCard
                title="Campanhas"
                description="Gerencie as campanhas"
                content="Crie, visualize e edite campanhas."
                href="/admin/campanhas"
            />
        </div>
    );
}
