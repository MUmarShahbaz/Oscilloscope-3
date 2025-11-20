module Jekyll
  class PageScriptTag < Liquid::Block
    def render(context)
      content = super.strip
      page = context.registers[:page]
      page['page_scripts'] ||= []
      page['page_scripts'] << content
      ''
    end
  end
  
  class RenderPageScriptsTag < Liquid::Tag
    def render(context)
      page = context.registers[:page]
      return '' unless page['page_scripts']
      page['page_scripts'].join("\n")
    end
  end
end

Liquid::Template.register_tag('script', Jekyll::PageScriptTag)
Liquid::Template.register_tag('page_scripts', Jekyll::RenderPageScriptsTag)