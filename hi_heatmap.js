jQuery(async () => {
  const getLevel = (level) => {
    switch (true) {
      case level === 0:
        return 0;
      case (level >= 1 && level <= 5):
        return 1;
      case (level >= 6 && level <= 10):
        return 2;
      case (level >= 11 && level <= 15):
        return 3;
      case (level >= 16 && level <= 20):
        return 4;
      case (level > 20):
        return 5;
    }
  };
  
  const createDot = (calendar) => {
    return Object.keys(calendar).map((date) => {
        const postCount = (calendar[date].posts || 0);
        const pageCount = (calendar[date].pages || 0);
        const tooltipContent = (postCount ? `文章: ${postCount}`: '') + (pageCount ? ` 页面: ${pageCount}`: '');
        const tooltip = tooltipContent ? `data-tooltip="${date} ${tooltipContent}"` : `data-tooltip="${date}"`;
        const level = getLevel(postCount + pageCount);
        
        return `<div data-date="${date}" class="hi_heatmap_dot dot_level_${level} dot_${date}" style="width:${itemDimension}px; height:${itemDimension}px" ${tooltip}></div>`;
      }).join("");
  };

  const hi_heatmap = jQuery("#hi_heatmap");
  const containerWidth = hi_heatmap.width();
  const itemDimension = (containerWidth - 14 * 2) / 15;
  
  const result = await fetch(hi_heatmap_object.ajax_url + "?action=get_heatmap&update=1");
  const data = await result.json();
  
  if (data.success) {
    const calendar = data.data.calendar || {};
    const list = createDot(calendar, itemDimension);
    
    hi_heatmap.append(list);
  }
});
