
initComments({
  node: document.getElementById("cactus-comments-thread"),
  defaultHomeserverUrl: '{{ default "https://matrix.cactus.chat:8448".Site.Params.Comments.Cactuscomments.ServerUrl }}',
  serverName: '{{ default "cactus.chat" .Site.Params.Comments.Cactuscomments.ServerName }}',
  siteName: "{{ .Site.Params.Comments.Cactuscomments.SiteName }}",
  commentSectionId: "{{ .RelPermalink }}"
});
