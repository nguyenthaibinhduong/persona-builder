type ProjectDemoEmbedProps = {
    url: string;
    title: string;
    className?: string;
};

const ProjectDemoEmbed = ({ url, title, className }: ProjectDemoEmbedProps) => {
    return (
        <div className={className}>
            <iframe
                src={url}
                title={`Demo preview: ${title}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                className="w-full h-full border-0"
            />
        </div>
    );
};

export default ProjectDemoEmbed;